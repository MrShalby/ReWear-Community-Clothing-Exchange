import React, { useState } from 'react';
import { createAdminUser } from '../config/firebase';
import { ShieldCheckIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const AdminSetup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    if (password.length < 6) {
      setResult({ success: false, message: 'Password must be at least 6 characters long' });
      setLoading(false);
      return;
    }

    try {
      const adminResult = await createAdminUser(email, password, name);
      
      if (adminResult.success) {
        setResult({ 
          success: true, 
          message: `Admin user created successfully! Email: ${email}` 
        });
        // Clear form
        setEmail('');
        setPassword('');
        setName('');
      } else {
        setResult({ 
          success: false, 
          message: `Failed to create admin: ${adminResult.error}` 
        });
      }
    } catch (error: any) {
      setResult({ 
        success: false, 
        message: `Error: ${error.message}` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
            <ShieldCheckIcon className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Admin Setup
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your first admin user account
          </p>
          <p className="mt-2 text-center text-xs text-red-600">
            ⚠️ Remove this component after creating admin
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-red-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {result && (
              <div className={`px-4 py-3 rounded-lg flex items-center ${
                result.success 
                  ? 'bg-green-50 border border-green-200 text-green-600' 
                  : 'bg-red-50 border border-red-200 text-red-600'
              }`}>
                {result.success ? (
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                ) : (
                  <XCircleIcon className="h-5 w-5 mr-2" />
                )}
                {result.message}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Admin Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Enter admin name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Admin Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Enter admin email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Admin Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Enter admin password (min 6 characters)"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-all duration-200"
            >
              {loading ? 'Creating Admin...' : 'Create Admin User'}
            </button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                After creating admin, go to{' '}
                <a href="/admin-login" className="text-red-600 hover:text-red-500">
                  /admin-login
                </a>{' '}
                to sign in
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup; 