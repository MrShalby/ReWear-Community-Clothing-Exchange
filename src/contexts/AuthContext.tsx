import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { useFirebase } from './FirebaseContext';
import { signUpUser, signInUser, signOutUser, createDocument, getDocument } from '../config/firebase';
import { sendWelcomeEmailFallback } from '../services/emailService';

interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { user: firebaseUser } = useFirebase();

  // Load user profile from Firestore when Firebase user changes
  useEffect(() => {
    const loadUserProfile = async (firebaseUser: FirebaseUser) => {
      try {
        // Try to get existing user profile from Firestore
        const userResult = await getDocument('users', firebaseUser.uid);
        
        if (userResult.success && userResult.data) {
          // User profile exists, use it
          const userData = userResult.data as any;
          setUser({
            id: firebaseUser.uid,
            name: userData.name,
            email: firebaseUser.email || '',
            points: userData.points || 100,
            role: userData.role || 'user',
            avatar: userData.avatar,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt
          });
        } else {
          // User profile doesn't exist, create a basic one
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'User',
            email: firebaseUser.email || '',
            points: 100,
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
        // Fallback to basic user info
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          points: 100,
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    };

    if (firebaseUser) {
      loadUserProfile(firebaseUser);
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [firebaseUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await signInUser(email, password);
      return result.success;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOutUser();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Create Firebase user account
      const signupResult = await signUpUser(email, password);
      
      if (signupResult.success && signupResult.user) {
        // Create user profile in Firestore
        const userProfile = {
          name,
          email,
          points: 100, // Welcome bonus
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const profileResult = await createDocument('users', userProfile, signupResult.user.uid);
        
        if (profileResult.success) {
          // Send welcome email
          sendWelcomeEmailFallback({
            user_name: name,
            user_email: email,
            points: 100
          });
          
          // User is automatically logged in after signup
          return true;
        } else {
          console.error('Failed to create user profile:', profileResult.error);
          return false;
        }
      } else {
        console.error('Failed to create user account:', signupResult.error);
        return false;
      }
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signup,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};