import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFirebaseOperations } from '../hooks/useFirebaseOperations';
import { 
  ArrowLeftIcon, 
  HeartIcon, 
  ShareIcon, 
  ArrowPathIcon,
  CurrencyDollarIcon,
  UserIcon,
  CalendarIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

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
  status: 'available' | 'swapped' | 'redeemed';
  tags: string[];
  type: string;
}

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { getDocument, updateDoc, createDocument, loading, error } = useFirebaseOperations();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');
  const [item, setItem] = useState<Item | null>(null);
  const [itemLoading, setItemLoading] = useState(true);

  // Sample items for demonstration (same as in BrowseItems)
  const sampleItems = [
    {
      id: 'sample-1',
      title: 'Vintage Denim Jacket',
      description: 'Classic blue denim jacket in excellent condition. Perfect for casual outings and street style looks.',
      category: 'Jackets & Coats',
      size: 'M',
      condition: 'Excellent',
      points: 75,
      images: ['https://images.pexels.com/photos/6311478/pexels-photo-6311478.jpeg?auto=compress&cs=tinysrgb&w=500'],
      uploaderName: 'Sarah M.',
      uploaderId: 'sample-user-1',
      status: 'available' as const,
      createdAt: new Date(Date.now() - 86400000),
      tags: ['vintage', 'denim', 'casual', 'jacket'],
      type: 'clothing'
    },
    {
      id: 'sample-2',
      title: 'Summer Floral Dress',
      description: 'Beautiful floral print dress perfect for summer. Light and breezy with a flattering fit.',
      category: 'Dresses',
      size: 'S',
      condition: 'Like New',
      points: 120,
      images: ['https://images.pexels.com/photos/6311479/pexels-photo-6311479.jpeg?auto=compress&cs=tinysrgb&w=500'],
      uploaderName: 'Emma L.',
      uploaderId: 'sample-user-2',
      status: 'available' as const,
      createdAt: new Date(Date.now() - 172800000),
      tags: ['summer', 'floral', 'dress', 'casual'],
      type: 'clothing'
    },
    {
      id: 'sample-3',
      title: 'Classic White Sneakers',
      description: 'Comfortable white sneakers in good condition. Versatile and perfect for everyday wear.',
      category: 'Shoes',
      size: '8',
      condition: 'Good',
      points: 60,
      images: ['https://images.pexels.com/photos/6311480/pexels-photo-6311480.jpeg?auto=compress&cs=tinysrgb&w=500'],
      uploaderName: 'Mike R.',
      uploaderId: 'sample-user-3',
      status: 'available' as const,
      createdAt: new Date(Date.now() - 259200000),
      tags: ['sneakers', 'white', 'casual', 'comfortable'],
      type: 'clothing'
    },
    {
      id: 'sample-4',
      title: 'Cozy Knit Sweater',
      description: 'Warm and soft knit sweater perfect for cold weather. Made from high-quality wool blend.',
      category: 'Sweaters & Knitwear',
      size: 'L',
      condition: 'Very Good',
      points: 85,
      images: ['https://images.pexels.com/photos/6311481/pexels-photo-6311481.jpeg?auto=compress&cs=tinysrgb&w=500'],
      uploaderName: 'Lisa K.',
      uploaderId: 'sample-user-4',
      status: 'available' as const,
      createdAt: new Date(Date.now() - 345600000),
      tags: ['sweater', 'knit', 'warm', 'winter'],
      type: 'clothing'
    },
    {
      id: 'sample-5',
      title: 'Stylish Leather Bag',
      description: 'Elegant leather bag with multiple compartments. Perfect for work or casual outings.',
      category: 'Accessories',
      size: 'One Size',
      condition: 'Like New',
      points: 150,
      images: ['https://images.pexels.com/photos/6311482/pexels-photo-6311482.jpeg?auto=compress&cs=tinysrgb&w=500'],
      uploaderName: 'Jessica P.',
      uploaderId: 'sample-user-5',
      status: 'available' as const,
      createdAt: new Date(Date.now() - 432000000),
      tags: ['leather', 'bag', 'elegant', 'accessory'],
      type: 'clothing'
    },
    {
      id: 'sample-6',
      title: 'Activewear Leggings',
      description: 'High-quality athletic leggings for workouts. Moisture-wicking and comfortable for all types of exercise.',
      category: 'Activewear',
      size: 'M',
      condition: 'Excellent',
      points: 70,
      images: ['https://images.pexels.com/photos/6311483/pexels-photo-6311483.jpeg?auto=compress&cs=tinysrgb&w=500'],
      uploaderName: 'Alex T.',
      uploaderId: 'sample-user-6',
      status: 'available' as const,
      createdAt: new Date(Date.now() - 518400000),
      tags: ['activewear', 'leggings', 'fitness', 'workout'],
      type: 'clothing'
    },
    {
      id: 'sample-7',
      title: 'Casual Cotton T-Shirt',
      description: 'Soft cotton t-shirt in navy blue. Perfect for everyday wear and layering.',
      category: 'Tops & T-Shirts',
      size: 'M',
      condition: 'Excellent',
      points: 45,
      images: ['https://images.pexels.com/photos/6311484/pexels-photo-6311484.jpeg?auto=compress&cs=tinysrgb&w=500'],
      uploaderName: 'David W.',
      uploaderId: 'sample-user-7',
      status: 'available' as const,
      createdAt: new Date(Date.now() - 604800000),
      tags: ['t-shirt', 'cotton', 'casual', 'basic'],
      type: 'clothing'
    },
    {
      id: 'sample-8',
      title: 'Slim Fit Jeans',
      description: 'Dark wash slim fit jeans with stretch. Comfortable and stylish for any occasion.',
      category: 'Pants & Jeans',
      size: '32x32',
      condition: 'Very Good',
      points: 65,
      images: ['https://images.pexels.com/photos/6311485/pexels-photo-6311485.jpeg?auto=compress&cs=tinysrgb&w=500'],
      uploaderName: 'Tom H.',
      uploaderId: 'sample-user-8',
      status: 'available' as const,
      createdAt: new Date(Date.now() - 691200000),
      tags: ['jeans', 'slim-fit', 'dark-wash', 'casual'],
      type: 'clothing'
    }
  ];

  // Fetch item details from Firebase or sample items
  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      
      // Check if it's a sample item first
      const sampleItem = sampleItems.find(item => item.id === id);
      if (sampleItem) {
        setItem(sampleItem);
        setItemLoading(false);
        return;
      }
      
      try {
        const result = await getDocument('items', id);
        if (result.success && result.data) {
          const itemData = result.data as any;
          setItem({
            ...itemData,
            createdAt: itemData.createdAt?.toDate() || new Date(),
            tags: itemData.tags || [],
            type: itemData.type || 'clothing'
          });
        } else {
          console.error('Failed to fetch item:', result.error);
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      } finally {
        setItemLoading(false);
      }
    };

    fetchItem();
  }, [id, getDocument]);

  if (itemLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h2>
          <button
            onClick={() => navigate('/browse')}
            className="text-green-600 hover:text-green-500"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const handleSwapRequest = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowSwapModal(true);
  };

  const handlePointsRedeem = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.points >= item.points) {
      try {
        // Update user points
        updateUser({ points: user.points - item.points });
        
        // Update item status
        await updateDoc('items', item.id, {
          status: 'redeemed',
          redeemedBy: user.id,
          redeemedAt: new Date()
        });

        // Create swap record
        await createDocument('swaps', {
          itemId: item.id,
          requesterId: user.id,
          requesterName: user.name,
          itemTitle: item.title,
          points: item.points,
          status: 'completed',
          type: 'points_redeem',
          createdAt: new Date()
        });

        alert('Item redeemed successfully!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error redeeming item:', error);
        alert('Failed to redeem item. Please try again.');
      }
    } else {
      alert('You don\'t have enough points to redeem this item.');
    }
  };

  const submitSwapRequest = async () => {
    if (!user || !item) return;

    try {
      // Create swap request
      const swapResult = await createDocument('swaps', {
        itemId: item.id,
        requesterId: user.id,
        requesterName: user.name,
        itemTitle: item.title,
        message: swapMessage,
        status: 'pending',
        type: 'swap_request',
        createdAt: new Date()
      });

      if (swapResult.success) {
        setShowSwapModal(false);
        setSwapMessage('');
        alert('Swap request sent successfully!');
        navigate('/dashboard');
      } else {
        alert('Failed to send swap request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting swap request:', error);
      alert('Failed to send swap request. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square overflow-hidden rounded-xl mb-4">
              <img
                src={item.images[currentImageIndex]}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500';
                }}
              />
            </div>
            {item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-lg ${
                      currentImageIndex === index ? 'ring-2 ring-green-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-green-100">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <p className="text-lg text-gray-600">{item.category} • Size {item.size}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {isFavorited ? (
                      <HeartIconSolid className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <ShareIcon className="h-6 w-6 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Status and Points */}
              <div className="flex items-center justify-between mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : item.status === 'swapped'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {item.status === 'available' ? 'Available' : 
                   item.status === 'swapped' ? 'Swapped' : 'Redeemed'}
                </span>
                <span className="text-2xl font-bold text-orange-600">
                  {item.points} points
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>

              {/* Item Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-500">Condition</span>
                  <p className="font-medium">{item.condition}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Type</span>
                  <p className="font-medium">{item.type}</p>
                </div>
              </div>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                    <TagIcon className="h-4 w-4 mr-1" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Uploader Info */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Listed by</h3>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <UserIcon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.uploaderName}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      Listed on {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {item.status === 'available' && user?.id !== item.uploaderId && (
                <div className="space-y-3">
                  <button
                    onClick={handleSwapRequest}
                    className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    <ArrowPathIcon className="h-5 w-5 mr-2" />
                    Request Swap
                  </button>
                  <button
                    onClick={handlePointsRedeem}
                    className="w-full flex items-center justify-center px-6 py-3 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                    Redeem for {item.points} Points
                  </button>
                  {user && user.points < item.points && (
                    <p className="text-sm text-red-600 text-center">
                      You need {item.points - user.points} more points to redeem this item
                    </p>
                  )}
                </div>
              )}

              {item.status !== 'available' && (
                <div className="text-center py-4">
                  <p className="text-gray-500">
                    This item is no longer available
                  </p>
                </div>
              )}

              {user?.id === item.uploaderId && (
                <div className="text-center py-4">
                  <p className="text-gray-500">
                    This is your listed item
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Swap Request Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Item Swap</h3>
            <p className="text-gray-600 mb-4">
              Send a message to {item.uploaderName} to request a swap for "{item.title}".
            </p>
            <textarea
              value={swapMessage}
              onChange={(e) => setSwapMessage(e.target.value)}
              placeholder="Hi! I'm interested in swapping for this item. I have..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 mb-4"
              rows={4}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSwapModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitSwapRequest}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;