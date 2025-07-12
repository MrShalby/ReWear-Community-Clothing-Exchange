import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
import { mockItems } from '../data/mockData';

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');

  const item = mockItems.find(item => item.id === id);

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

  const handlePointsRedeem = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.points >= item.points) {
      updateUser({ points: user.points - item.points });
      alert('Item redeemed successfully!');
      navigate('/dashboard');
    } else {
      alert('You don\'t have enough points to redeem this item.');
    }
  };

  const submitSwapRequest = () => {
    // In a real app, this would submit to an API
    console.log('Swap request submitted:', {
      itemId: item.id,
      requesterId: user?.id,
      message: swapMessage
    });
    setShowSwapModal(false);
    alert('Swap request sent successfully!');
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