import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFirebaseOperations } from '../hooks/useFirebaseOperations';
import { 
  ShieldCheckIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const { updateDoc } = useFirebaseOperations();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in as admin
  if (user?.role === 'admin') {
    navigate('/admin');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      
      if (success) {
        // Check if user is admin
        if (user?.role === 'admin') {
          navigate('/admin');
        } else {
          // Try to promote user to admin if using admin credentials
          if (email === 'admin@rewear.com' && password === 'admin123') {
            await updateDoc('users', user?.id || '', {
              role: 'admin',
              updatedAt: new Date()
            });
            navigate('/admin');
          } else {
            setError('Access denied. Admin credentials required.');
          }
        }
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center">
            <ShieldCheckIcon className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access the ReWear admin panel
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="admin@rewear.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Sign in to Admin Panel'
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-green-600 hover:text-green-500 text-sm"
            >
              ← Back to regular login
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Demo Admin Credentials:</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Email:</strong> admin@rewear.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 