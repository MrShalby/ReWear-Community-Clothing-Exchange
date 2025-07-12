import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocuments } from '../config/firebase';

// Sample items for the carousel when no real items are available
const sampleCarouselItems = [
  {
    id: 'sample-1',
    title: 'Vintage Denim Jacket',
    category: 'Jackets & Coats',
    size: 'M',
    points: 75,
    status: 'available',
    images: ['https://images.pexels.com/photos/6311478/pexels-photo-6311478.jpeg?auto=compress&cs=tinysrgb&w=500']
  },
  {
    id: 'sample-2',
    title: 'Summer Floral Dress',
    category: 'Dresses',
    size: 'S',
    points: 120,
    status: 'available',
    images: ['https://images.pexels.com/photos/6311479/pexels-photo-6311479.jpeg?auto=compress&cs=tinysrgb&w=500']
  },
  {
    id: 'sample-3',
    title: 'Classic White Sneakers',
    category: 'Shoes',
    size: '8',
    points: 60,
    status: 'available',
    images: ['https://images.pexels.com/photos/6311480/pexels-photo-6311480.jpeg?auto=compress&cs=tinysrgb&w=500']
  },
  {
    id: 'sample-4',
    title: 'Cozy Knit Sweater',
    category: 'Sweaters & Knitwear',
    size: 'L',
    points: 85,
    status: 'available',
    images: ['https://images.pexels.com/photos/6311481/pexels-photo-6311481.jpeg?auto=compress&cs=tinysrgb&w=500']
  },
  {
    id: 'sample-5',
    title: 'Stylish Leather Bag',
    category: 'Accessories',
    size: 'One Size',
    points: 150,
    status: 'available',
    images: ['https://images.pexels.com/photos/6311482/pexels-photo-6311482.jpeg?auto=compress&cs=tinysrgb&w=500']
  },
  {
    id: 'sample-6',
    title: 'Activewear Leggings',
    category: 'Activewear',
    size: 'M',
    points: 70,
    status: 'available',
    images: ['https://images.pexels.com/photos/6311483/pexels-photo-6311483.jpeg?auto=compress&cs=tinysrgb&w=500']
  }
];

const ItemCarousel: React.FC = () => {
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const result = await getDocuments('items', [
          { field: 'status', operator: '==', value: 'available' }
        ]);
        
        if (result.success && result.data && result.data.length > 0) {
          // Take first 6 available items
          setFeaturedItems(result.data.slice(0, 6));
        } else {
          // Use sample items if no real items are available
          setFeaturedItems(sampleCarouselItems);
        }
      } catch (error) {
        console.error('Error fetching featured items:', error);
        // Use sample items as fallback
        setFeaturedItems(sampleCarouselItems);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
            <div className="aspect-square bg-gray-200 animate-pulse"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredItems.map((item) => (
        <Link
          key={item.id}
          to={`/item/${item.id}`}
          className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-green-100"
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={item.images?.[0] || 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500'}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500';
              }}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{item.category} • Size {item.size}</p>
            <div className="flex items-center justify-between">
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
              <span className="text-sm font-medium text-orange-600">
                {item.points} points
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ItemCarousel;