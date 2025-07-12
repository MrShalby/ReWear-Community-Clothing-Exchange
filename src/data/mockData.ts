export interface ClothingItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: string;
  tags: string[];
  images: string[];
  uploaderId: string;
  uploaderName: string;
  uploaderAvatar?: string;
  points: number;
  status: 'available' | 'swapped' | 'redeemed';
  createdAt: string;
  approved: boolean;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  itemId: string;
  itemTitle: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  message?: string;
}

export const mockItems: ClothingItem[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Beautiful vintage denim jacket in excellent condition. Perfect for layering and adding a classic touch to any outfit.',
    category: 'Jackets & Coats',
    type: 'Jacket',
    size: 'M',
    condition: 'Excellent',
    tags: ['vintage', 'denim', 'casual', 'blue'],
    images: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    uploaderId: '2',
    uploaderName: 'Sarah Johnson',
    points: 75,
    status: 'available',
    createdAt: '2024-01-15',
    approved: true
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
    description: 'Light and airy floral dress perfect for summer occasions. Made from breathable cotton fabric.',
    category: 'Dresses',
    type: 'Dress',
    size: 'S',
    condition: 'Good',
    tags: ['floral', 'summer', 'cotton', 'casual'],
    images: [
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    uploaderId: '3',
    uploaderName: 'Emma Wilson',
    points: 60,
    status: 'available',
    createdAt: '2024-01-14',
    approved: true
  },
  {
    id: '3',
    title: 'Black Leather Boots',
    description: 'Stylish black leather ankle boots with minimal wear. Great for both casual and formal occasions.',
    category: 'Shoes',
    type: 'Boots',
    size: '8',
    condition: 'Very Good',
    tags: ['leather', 'black', 'boots', 'versatile'],
    images: [
      'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    uploaderId: '4',
    uploaderName: 'Michael Brown',
    points: 85,
    status: 'swapped',
    createdAt: '2024-01-13',
    approved: true
  },
  {
    id: '4',
    title: 'Wool Cardigan',
    description: 'Cozy wool cardigan in cream color. Perfect for cooler weather and professional settings.',
    category: 'Sweaters & Knitwear',
    type: 'Cardigan',
    size: 'L',
    condition: 'Excellent',
    tags: ['wool', 'cardigan', 'professional', 'cream'],
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    uploaderId: '5',
    uploaderName: 'Lisa Davis',
    points: 70,
    status: 'available',
    createdAt: '2024-01-12',
    approved: true
  },
  {
    id: '5',
    title: 'Designer Silk Scarf',
    description: 'Authentic designer silk scarf with beautiful pattern. A timeless accessory for any wardrobe.',
    category: 'Accessories',
    type: 'Scarf',
    size: 'One Size',
    condition: 'Like New',
    tags: ['silk', 'designer', 'luxury', 'pattern'],
    images: [
      'https://images.pexels.com/photos/6069778/pexels-photo-6069778.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    uploaderId: '6',
    uploaderName: 'Rachel Green',
    points: 90,
    status: 'available',
    createdAt: '2024-01-11',
    approved: true
  },
  {
    id: '6',
    title: 'Casual White Sneakers',
    description: 'Clean white sneakers in great condition. Perfect for everyday wear and athletic activities.',
    category: 'Shoes',
    type: 'Sneakers',
    size: '9',
    condition: 'Good',
    tags: ['sneakers', 'white', 'casual', 'comfortable'],
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    uploaderId: '7',
    uploaderName: 'David Miller',
    points: 45,
    status: 'redeemed',
    createdAt: '2024-01-10',
    approved: true
  }
];

export const mockSwapRequests: SwapRequest[] = [
  {
    id: '1',
    requesterId: '2',
    requesterName: 'Sarah Johnson',
    itemId: '1',
    itemTitle: 'Vintage Denim Jacket',
    status: 'pending',
    createdAt: '2024-01-16',
    message: 'Hi! I love this jacket and would love to swap it for one of my items.'
  },
  {
    id: '2',
    requesterId: '3',
    requesterName: 'Emma Wilson',
    itemId: '2',
    itemTitle: 'Floral Summer Dress',
    status: 'completed',
    createdAt: '2024-01-15',
    message: 'This dress would be perfect for my summer vacation!'
  }
];