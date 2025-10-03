import React from 'react';
import { Heart, Users, Shield, Award } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const Homepage: React.FC = () => {
  const stats = [
    { icon: Heart, label: 'Animals Rescued', value: '2,500+' },
    { icon: Users, label: 'Happy Families', value: '1,800+' },
    { icon: Shield, label: 'Years of Service', value: '15+' },
    { icon: Award, label: 'Success Rate', value: '98%' }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block text-yellow-300">Furry Friend</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Every animal deserves a loving home. Browse our adorable companions waiting to bring joy to your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                // onClick={() => onNavigate('animals')}
                size="lg"
                className="border border-white text-white hover:bg-white hover:text-orange-600"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex justify-center mb-4">
                <stat.icon className="h-12 w-12 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Animals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Animals</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet some of our adorable animals who are looking for their forever homes
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* {featuredAnimals.slice(0, 6).map((animal) => (
            <div key={animal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-12">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{animal.name}</h3>
                  <span className="text-xl font-bold text-orange-500">${animal.price}</span>
                </div>
                <p className="text-gray-600 mb-1">{animal.breed}</p>
                <p className="text-gray-500 mb-3">
                  {animal.age} year{animal.age !== 1 ? 's' : ''} old • {animal.size}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-2">{animal.description}</p>
                <Button
                  onClick={() => onAddToCart(animal)}
                  className="w-full"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))} */}
        </div>

        <div className="text-center mt-12">
          <Button
            // onClick={() => onNavigate('animals')}
            size="lg"
            variant="outline"
          >
            View All Animals
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple steps to find your new best friend</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Animals</h3>
              <p className="text-gray-600">
                Explore our selection of loving animals waiting for their forever homes
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Meet & Connect</h3>
              <p className="text-gray-600">
                Add your favorites to cart and schedule a meet-and-greet
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Welcome Home</h3>
              <p className="text-gray-600">
                Complete the adoption process and welcome your new family member
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-orange-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Change a Life?</h2>
          <p className="text-xl mb-8">
            Every adoption saves a life and brings immeasurable joy to your family.
            Start your journey today.
          </p>
          <Button
            // onClick={() => onNavigate('animals')}
            size="lg"
            className="border border-white text-white hover:bg-white hover:text-orange-600"
          >
            Start Adopting Now
          </Button>
        </div>
      </section>
    </div>
  );
};