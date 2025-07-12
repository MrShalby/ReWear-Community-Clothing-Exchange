import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  PlusIcon, 
  CurrencyDollarIcon, 
  SparklesIcon, 
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';
import { mockSwapRequests } from '../data/mockData';
import SuccessMessage from '../components/SuccessMessage';
import { getDocuments } from '../config/firebase';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userItems, setUserItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's items from Firebase
  useEffect(() => {
    const fetchUserItems = async () => {
      if (!user) return;
      
      try {
        const result = await getDocuments('items', [
          { field: 'uploaderId', operator: '==', value: user.id }
        ]);
        
        if (result.success) {
          setUserItems(result.data || []);
        } else {
          console.error('Failed to fetch user items:', result.error);
        }
      } catch (error) {
        console.error('Error fetching user items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserItems();
  }, [user]);

  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'item_listed') {
      setShowSuccessMessage(true);
      // Remove the message from URL
      window.history.replaceState({}, '', '/dashboard');
      // Refresh the items list
      if (user) {
        const fetchUserItems = async () => {
          try {
            const result = await getDocuments('items', [
              { field: 'uploaderId', operator: '==', value: user.id }
            ]);
            
            if (result.success) {
              setUserItems(result.data || []);
            }
          } catch (error) {
            console.error('Error refreshing user items:', error);
          }
        };
        fetchUserItems();
      }
    }
  }, [searchParams, user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access your dashboard</h2>
          <Link to="/login" className="text-green-600 hover:text-green-500">Go to Login</Link>
        </div>
      </div>
    );
  }

  const userSwapRequests = mockSwapRequests.filter(request => request.requesterId === user.id);

  const stats = [
    {
      name: 'Total Points',
      value: user.points,
      icon: CurrencyDollarIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Items Listed',
      value: loading ? '...' : userItems.length,
      icon: SparklesIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Swaps Completed',
      value: userSwapRequests.filter(req => req.status === 'completed').length,
      icon: CheckCircleIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Pending Requests',
      value: userSwapRequests.filter(req => req.status === 'pending').length,
      icon: ClockIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6">
            <SuccessMessage
              title="Item Listed Successfully!"
              message="Your item has been added to the marketplace. Other users can now browse and request to swap for it."
              onClose={() => setShowSuccessMessage(false)}
            />
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Ready to continue your sustainable fashion journey?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-green-100">
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-lg mr-4`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-green-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/add-item"
              className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors group"
            >
              <PlusIcon className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-green-600 font-medium">List New Item</span>
            </Link>
            <Link
              to="/browse"
              className="flex items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors group"
            >
              <SparklesIcon className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-blue-600 font-medium">Browse Items</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center justify-center p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors group"
            >
              <ArrowPathIcon className="h-6 w-6 text-purple-600 mr-2" />
              <span className="text-purple-600 font-medium">View Profile</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Items */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-green-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">My Listed Items</h2>
              <button
                onClick={async () => {
                  setLoading(true);
                  try {
                    const result = await getDocuments('items', [
                      { field: 'uploaderId', operator: '==', value: user.id }
                    ]);
                    if (result.success) {
                      setUserItems(result.data || []);
                    }
                  } catch (error) {
                    console.error('Error refreshing items:', error);
                  } finally {
                    setLoading(false);
                  }
                }}
                className="text-green-600 hover:text-green-700 transition-colors"
                disabled={loading}
              >
                <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your items...</p>
              </div>
            ) : userItems.length > 0 ? (
              <div className="space-y-4">
                {userItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.images && item.images[0] ? item.images[0] : 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500'}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.points} points</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : item.status === 'swapped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.status === 'available' ? 'Available' : 
                       item.status === 'swapped' ? 'Swapped' : 'Redeemed'}
                    </span>
                  </div>
                ))}
                {userItems.length > 3 && (
                  <Link to="/profile" className="text-green-600 hover:text-green-500 text-sm font-medium">
                    View all {userItems.length} items →
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">You haven't listed any items yet</p>
                <Link
                  to="/add-item"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  List Your First Item
                </Link>
              </div>
            )}
          </div>

          {/* Swap Requests */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-green-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Swap Requests</h2>
            {userSwapRequests.length > 0 ? (
              <div className="space-y-4">
                {userSwapRequests.slice(0, 3).map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{request.itemTitle}</h3>
                      <p className="text-sm text-gray-600">{request.createdAt}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : request.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                ))}
                {userSwapRequests.length > 3 && (
                  <Link to="/profile" className="text-green-600 hover:text-green-500 text-sm font-medium">
                    View all requests →
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <ArrowPathIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No swap requests yet</p>
                <Link
                  to="/browse"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Browsing Items
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;