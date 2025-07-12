import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFirebaseOperations } from '../hooks/useFirebaseOperations';
import { getDocuments } from '../config/firebase';
import { 
  UserIcon, 
  EnvelopeIcon, 
  CurrencyDollarIcon,
  CalendarIcon,
  PencilIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { updateDoc } = useFirebaseOperations();
  const [userStats, setUserStats] = useState({
    itemsListed: 0,
    swapsCompleted: 0,
    averageRating: 4.8
  });
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  // Fetch user statistics
  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) return;
      
      try {
        // Fetch user's items
        const itemsResult = await getDocuments('items', [
          { field: 'uploaderId', operator: '==', value: user.id }
        ]);
        
        // Fetch completed swaps
        const swapsResult = await getDocuments('swaps', [
          { field: 'requesterId', operator: '==', value: user.id },
          { field: 'status', operator: '==', value: 'completed' }
        ]);
        
        setUserStats({
          itemsListed: itemsResult.success ? (itemsResult.data?.length || 0) : 0,
          swapsCompleted: swapsResult.success ? (swapsResult.data?.length || 0) : 0,
          averageRating: 4.8 // Default rating
        });
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user]);

  const handleEditProfile = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowEditModal(true);
    setEditError('');
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setEditLoading(true);
    setEditError('');

    try {
      // Validate form
      if (!editForm.name.trim()) {
        setEditError('Name is required');
        return;
      }

      if (!editForm.email.trim() || !editForm.email.includes('@')) {
        setEditError('Please enter a valid email address');
        return;
      }

      // Validate password change if user wants to change password
      if (showPasswordFields) {
        if (!editForm.currentPassword.trim()) {
          setEditError('Current password is required');
          return;
        }

        if (editForm.newPassword.trim() && editForm.newPassword.length < 6) {
          setEditError('New password must be at least 6 characters long');
          return;
        }

        if (editForm.newPassword.trim() && editForm.newPassword !== editForm.confirmPassword) {
          setEditError('New passwords do not match');
          return;
        }
      }

      // Update user profile in Firebase
      const result = await updateDoc('users', user.id, {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        updatedAt: new Date()
      });

      if (result.success) {
        // Update local user state
        updateUser({
          name: editForm.name.trim(),
          email: editForm.email.trim()
        });
        
        setShowEditModal(false);
        setShowPasswordFields(false);
        // Show success message
        alert('Profile updated successfully!');
      } else {
        setEditError('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setEditError('An error occurred. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditError('');
    setShowPasswordFields(false);
    setEditForm({
      name: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your profile</h2>
          <button
            onClick={() => navigate('/login')}
            className="text-green-600 hover:text-green-500"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-lg text-gray-600">
            Manage your ReWear account and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-green-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-r from-green-500 to-orange-500 p-4 rounded-full">
                <UserIcon className="h-12 w-12 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600 flex items-center mt-1">
                  <EnvelopeIcon className="h-4 w-4 mr-2" />
                  {user.email}
                </p>
                <div className="flex items-center mt-2">
                  <CurrencyDollarIcon className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-lg font-semibold text-green-600">{user.points} points</span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleEditProfile}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {loading ? '...' : userStats.itemsListed}
              </div>
              <div className="text-sm text-gray-600">Items Listed</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {loading ? '...' : userStats.swapsCompleted}
              </div>
              <div className="text-sm text-gray-600">Successful Swaps</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {loading ? '...' : userStats.averageRating}
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-green-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Since
                </label>
                <div className="flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span>January 2024</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  {user.role === 'admin' ? 'Administrator' : 'Standard User'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {editError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {editError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Password Change Section */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
                  <button
                    type="button"
                    onClick={() => setShowPasswordFields(!showPasswordFields)}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    {showPasswordFields ? 'Cancel' : 'Change Password'}
                  </button>
                </div>

                {showPasswordFields && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={editForm.currentPassword}
                        onChange={(e) => setEditForm({ ...editForm, currentPassword: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your current password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={editForm.newPassword}
                        onChange={(e) => setEditForm({ ...editForm, newPassword: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter your new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={editForm.confirmPassword}
                        onChange={(e) => setEditForm({ ...editForm, confirmPassword: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Confirm your new password"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={editLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={editLoading}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <CheckIcon className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;