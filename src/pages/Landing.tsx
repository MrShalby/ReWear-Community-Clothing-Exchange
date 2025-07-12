import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon, 
  HeartIcon, 
  GlobeEuropeAfricaIcon, 
  CurrencyDollarIcon,
  UserGroupIcon 
} from '@heroicons/react/24/outline';
import ItemCarousel from '../components/ItemCarousel';

const Landing: React.FC = () => {
  const features = [
    {
      icon: HeartIcon,
      title: 'Sustainable Fashion',
      description: 'Give your clothes a second life while reducing environmental impact.'
    },
    {
      icon: UserGroupIcon,
      title: 'Community Driven',
      description: 'Connect with like-minded people who value sustainable living.'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Point System',
      description: 'Earn points by listing items and use them to get new clothes.'
    },
    {
      icon: GlobeEuropeAfricaIcon,
      title: 'Global Impact',
      description: 'Join the movement towards a more sustainable fashion industry.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-green-500 to-orange-500 bg-clip-text text-transparent">
                ReWear
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join our community clothing exchange platform where sustainability meets style. 
              Swap your unused clothes, earn points, and discover amazing pre-loved fashion pieces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-green-500 to-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                Start Swapping
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <Link
                to="/browse"
                className="border-2 border-green-500 text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Browse Items
              </Link>
              <Link
                to="/add-item"
                className="border-2 border-orange-500 text-orange-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                List an Item
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Items</h2>
            <p className="text-lg text-gray-600">
              Discover amazing pre-loved fashion pieces from our community
            </p>
          </div>
          <ItemCarousel />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ReWear?</h2>
            <p className="text-lg text-gray-600">
              Join the sustainable fashion revolution with our innovative platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-green-100"
              >
                <div className="bg-gradient-to-r from-green-500 to-orange-500 p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Sustainable Fashion Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who are already making a difference through clothing exchange.
          </p>
          <Link
            to="/signup"
            className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
          >
            Get Started Today
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;