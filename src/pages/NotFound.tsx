import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  MagnifyingGlassIcon,
  PlusIcon 
} from '@heroicons/react/24/outline';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto h-24 w-24 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl font-bold text-white">404</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist. Let's get you back on track!
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Go to Home
          </Link>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/browse"
              className="flex items-center justify-center px-4 py-2 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
              Browse Items
            </Link>
            
            <Link
              to="/add-item"
              className="flex items-center justify-center px-4 py-2 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              List an Item
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 