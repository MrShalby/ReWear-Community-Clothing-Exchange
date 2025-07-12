import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  AdjustmentsHorizontalIcon 
} from '@heroicons/react/24/outline';
import { getDocuments, createDocument } from '../config/firebase';

// Sample items for demonstration with matching images and realistic names
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
    status: 'available',
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    tags: ['vintage', 'denim', 'casual', 'jacket']
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
    status: 'available',
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    tags: ['summer', 'floral', 'dress', 'casual']
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
    status: 'available',
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    tags: ['sneakers', 'white', 'casual', 'comfortable']
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
    status: 'available',
    createdAt: new Date(Date.now() - 345600000), // 4 days ago
    tags: ['sweater', 'knit', 'warm', 'winter']
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
    status: 'available',
    createdAt: new Date(Date.now() - 432000000), // 5 days ago
    tags: ['leather', 'bag', 'elegant', 'accessory']
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
    status: 'available',
    createdAt: new Date(Date.now() - 518400000), // 6 days ago
    tags: ['activewear', 'leggings', 'fitness', 'workout']
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
    status: 'available',
    createdAt: new Date(Date.now() - 604800000), // 7 days ago
    tags: ['t-shirt', 'cotton', 'casual', 'basic']
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
    status: 'available',
    createdAt: new Date(Date.now() - 691200000), // 8 days ago
    tags: ['jeans', 'slim-fit', 'dark-wash', 'casual']
  }
];

const BrowseItems: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showingSampleItems, setShowingSampleItems] = useState(false);

  // Function to create sample items in the database
  const createSampleItems = async () => {
    try {
      for (const sampleItem of sampleItems) {
        await createDocument('items', {
          ...sampleItem,
          uploaderId: 'sample-user',
          uploaderEmail: 'sample@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      console.log('Sample items created successfully');
      // Refresh the items list
      const result = await getDocuments('items', [
        { field: 'status', operator: '==', value: 'available' }
      ]);
      if (result.success) {
        setItems(result.data || []);
        setShowingSampleItems(false);
      }
    } catch (error) {
      console.error('Error creating sample items:', error);
    }
  };

  const categories = [
    'All Categories',
    'Tops & T-Shirts',
    'Dresses',
    'Pants & Jeans',
    'Jackets & Coats',
    'Shoes',
    'Accessories',
    'Sweaters & Knitwear',
    'Activewear',
    'Formal Wear'
  ];

  const sizes = ['All Sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12'];
  const conditions = ['All Conditions', 'Like New', 'Excellent', 'Very Good', 'Good', 'Fair'];

  // Fetch items from Firebase
  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log('Fetching all available items...');
        const result = await getDocuments('items', [
          { field: 'status', operator: '==', value: 'available' }
        ]);
        
        if (result.success) {
          console.log('Fetched items:', result.data);
          const realItems = result.data || [];
          
          // Always show sample items mixed with real items for better demo experience
          const allItems = [...realItems, ...sampleItems];
          setItems(allItems);
          setShowingSampleItems(true);
        } else {
          console.error('Failed to fetch items:', result.error);
          // Show sample items as fallback
          setItems(sampleItems);
          setShowingSampleItems(true);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Filter and sort items
  const filteredItems = items
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = !selectedCategory || selectedCategory === 'All Categories' || item.category === selectedCategory;
      const matchesSize = !selectedSize || selectedSize === 'All Sizes' || item.size === selectedSize;
      const matchesCondition = !selectedCondition || selectedCondition === 'All Conditions' || item.condition === selectedCondition;
      const isAvailable = item.status === 'available';

      return matchesSearch && matchesCategory && matchesSize && matchesCondition && isAvailable;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'points-low':
          return a.points - b.points;
        case 'points-high':
          return b.points - a.points;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Items</h1>
          <p className="text-lg text-gray-600">
            Discover amazing pre-loved fashion pieces from our community
          </p>
          
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-green-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filters
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="points-low">Points: Low to High</option>
              <option value="points-high">Points: High to Low</option>
            </select>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-4 pt-4 border-t border-gray-200`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category === 'All Categories' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                {sizes.map((size) => (
                  <option key={size} value={size === 'All Sizes' ? '' : size}>
                    {size}
                  </option>
                ))}
              </select>

              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                {conditions.map((condition) => (
                  <option key={condition} value={condition === 'All Conditions' ? '' : condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading items...' : `${filteredItems.length} item${filteredItems.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading items...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                to={`/item/${item.id}`}
                className="group block bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-green-100"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.images && item.images[0] ? item.images[0] : 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500'}
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
                  <p className="text-sm text-gray-500 mb-3">{item.condition}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      by {item.uploaderName}
                    </span>
                    <span className="text-lg font-bold text-orange-600">
                      {item.points} pts
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AdjustmentsHorizontalIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to see more items
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedSize('');
                setSelectedCondition('');
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseItems;