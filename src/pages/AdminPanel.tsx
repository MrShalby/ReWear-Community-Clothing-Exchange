import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFirebaseOperations } from '../hooks/useFirebaseOperations';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  TrashIcon,
  EyeIcon,
  UserIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  FlagIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  size: string;
  condition: string;
  points: number;
  images: string[];
  uploaderName: string;
  uploaderId: string;
  createdAt: Date;
  approved: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'removed';
  moderationNotes?: string;
}

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getDocs, updateDoc, deleteDoc, loading, error } = useFirebaseOperations();
  const [activeTab, setActiveTab] = useState('pending');
  const [items, setItems] = useState<Item[]>([]);
  const [moderationNotes, setModerationNotes] = useState<{ [key: string]: string }>({});
  const [showModerationModal, setShowModerationModal] = useState<{ show: boolean; itemId: string | null }>({ show: false, itemId: null });

  // Load items from Firestore
  useEffect(() => {
    const loadItems = async () => {
      const result = await getDocs('items');
      if (result.success && result.data) {
        setItems(result.data.map((item: any) => ({
          ...item,
          createdAt: item.createdAt?.toDate() || new Date(),
          approved: item.status === 'approved',
          status: item.status || 'pending'
        })));
      }
    };

    if (user?.role === 'admin') {
      loadItems();
    }
  }, [user, getDocs]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-green-600 hover:text-green-500"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleApprove = async (itemId: string) => {
    const notes = moderationNotes[itemId] || '';
    const result = await updateDoc('items', itemId, {
      status: 'approved',
      approved: true,
      moderatedBy: user?.id,
      moderatedAt: new Date(),
      moderationNotes: notes
    });

    if (result.success) {
      setItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, approved: true, status: 'approved' } : item
      ));
      setModerationNotes(prev => ({ ...prev, [itemId]: '' }));
    }
  };

  const handleReject = async (itemId: string) => {
    const notes = moderationNotes[itemId] || 'Item rejected by admin';
    const result = await updateDoc('items', itemId, {
      status: 'rejected',
      approved: false,
      moderatedBy: user?.id,
      moderatedAt: new Date(),
      moderationNotes: notes
    });

    if (result.success) {
      setItems(prev => prev.filter(item => item.id !== itemId));
      setModerationNotes(prev => ({ ...prev, [itemId]: '' }));
    }
  };

  const handleDelete = async (itemId: string) => {
    if (confirm('Are you sure you want to permanently delete this item? This action cannot be undone.')) {
      const result = await deleteDoc('items', itemId);
      
      if (result.success) {
        setItems(prev => prev.filter(item => item.id !== itemId));
      }
    }
  };

  const handleFlagInappropriate = async (itemId: string) => {
    const notes = moderationNotes[itemId] || 'Item flagged as inappropriate';
    const result = await updateDoc('items', itemId, {
      status: 'removed',
      approved: false,
      moderatedBy: user?.id,
      moderatedAt: new Date(),
      moderationNotes: notes,
      flaggedAs: 'inappropriate'
    });

    if (result.success) {
      setItems(prev => prev.filter(item => item.id !== itemId));
      setModerationNotes(prev => ({ ...prev, [itemId]: '' }));
    }
  };

  const pendingItems = items.filter(item => item.status === 'pending');
  const approvedItems = items.filter(item => item.status === 'approved');
  const rejectedItems = items.filter(item => item.status === 'rejected');
  const allItems = items;

  const getItemsForTab = () => {
    switch (activeTab) {
      case 'pending':
        return pendingItems;
      case 'approved':
        return approvedItems;
      case 'rejected':
        return rejectedItems;
      case 'all':
        return allItems;
      default:
        return [];
    }
  };

  const stats = [
    {
      name: 'Total Items',
      value: allItems.length,
      icon: SparklesIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Pending Approval',
      value: pendingItems.length,
      icon: ExclamationTriangleIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'Approved Items',
      value: approvedItems.length,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Total Users',
      value: 156,
      icon: UserIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-lg text-gray-600">
            Manage items and moderate the ReWear community
          </p>
          {loading && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg">
              Loading items...
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              Error: {error}
            </div>
          )}
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

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-green-100">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'pending', name: 'Pending Approval', count: pendingItems.length },
                { id: 'approved', name: 'Approved Items', count: approvedItems.length },
                { id: 'rejected', name: 'Rejected Items', count: rejectedItems.length },
                { id: 'all', name: 'All Items', count: allItems.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Items List */}
          <div className="p-6">
            {getItemsForTab().length > 0 ? (
              <div className="space-y-4">
                {getItemsForTab().map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.images?.[0] || '/placeholder-image.jpg'}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        {item.status === 'approved' && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Approved</span>
                        )}
                        {item.status === 'rejected' && (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Rejected</span>
                        )}
                        {item.status === 'removed' && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Removed</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.category} • Size {item.size} • {item.condition}
                      </p>
                      <p className="text-sm text-gray-500">
                        by {item.uploaderName} • {item.points} points
                      </p>
                      <p className="text-xs text-gray-400">
                        Listed on {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      {item.moderationNotes && (
                        <p className="text-xs text-orange-600 mt-1">
                          <strong>Notes:</strong> {item.moderationNotes}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/item/${item.id}`)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Item"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      
                      {activeTab === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleReject(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleFlagInappropriate(item.id)}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Flag as Inappropriate"
                          >
                            <FlagIcon className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      
                      {activeTab === 'approved' && (
                        <button
                          onClick={() => handleFlagInappropriate(item.id)}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Remove as Inappropriate"
                        >
                          <FlagIcon className="h-5 w-5" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Permanently Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-600">
                  {activeTab === 'pending' 
                    ? 'All items have been reviewed' 
                    : 'No items to display'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;