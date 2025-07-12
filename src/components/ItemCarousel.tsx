import React from 'react';
import { Link } from 'react-router-dom';
import { mockItems } from '../data/mockData';

const ItemCarousel: React.FC = () => {
  const featuredItems = mockItems.slice(0, 6);

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
              src={item.images[0]}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
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