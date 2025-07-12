import { useState } from 'react';
import {
  signInUser,
  signUpUser,
  signOutUser,
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  getDocuments,
  uploadFile,
  deleteFile
} from '../config/firebase';

export const useFirebaseOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOperation = async (operation: () => Promise<any>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await operation();
      if (!result.success) {
        setError(result.error);
      }
      return result;
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Authentication operations
  const login = (email: string, password: string) => {
    return handleOperation(() => signInUser(email, password));
  };

  const register = (email: string, password: string) => {
    return handleOperation(() => signUpUser(email, password));
  };

  const logout = () => {
    return handleOperation(() => signOutUser());
  };

  // Firestore operations
  const createDoc = (collectionName: string, data: any, docId?: string) => {
    return handleOperation(() => createDocument(collectionName, data, docId));
  };

  const getDoc = (collectionName: string, docId: string) => {
    return handleOperation(() => getDocument(collectionName, docId));
  };

  const updateDoc = (collectionName: string, docId: string, data: any) => {
    return handleOperation(() => updateDocument(collectionName, docId, data));
  };

  const deleteDoc = (collectionName: string, docId: string) => {
    return handleOperation(() => deleteDocument(collectionName, docId));
  };

  const getDocs = (collectionName: string, conditions?: any[]) => {
    return handleOperation(() => getDocuments(collectionName, conditions));
  };

  // Storage operations
  const upload = (file: File, path: string) => {
    return handleOperation(() => uploadFile(file, path));
  };

  const deleteStorageFile = (path: string) => {
    return handleOperation(() => deleteFile(path));
  };

  return {
    loading,
    error,
    // Auth
    login,
    register,
    logout,
    // Firestore
    createDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    // Storage
    upload,
    deleteStorageFile,
  };
}; 