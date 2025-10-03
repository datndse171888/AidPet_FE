import React, { useEffect, useState } from 'react';
import { Search, PawPrint, Menu, CircleUser } from 'lucide-react';
import { AccountResponse } from '../../../types/User';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isActive, setIsActive] = React.useState<string>(''); // Replace with real auth logic
  const userString = localStorage.getItem('user');
  const user: AccountResponse = userString ? JSON.parse(userString) : null;
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with real auth logic

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const navItems = [
    { key: '', label: 'Home' },
    { key: 'cart', label: 'Cart' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">Aid Pet</span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for animals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </form>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                href={`/${item.key}`}
                onClick={e => setIsActive(item.key) }
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive === item.key
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-700 hover:text-orange-600'
                  }`}
              >
                {item.label}
                {/* {item.key === 'cart' && cartItemsCount > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-orange-500 rounded-full">
                    {cartItemsCount}
                  </span>
                )} */}
              </a>
            ))}

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <a href="/profile" className="flex items-center">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="User avatar"
                        className="h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-orange-300 transition-all cursor-pointer"
                      />
                    ) : (
                      <CircleUser className="h-6 w-6 text-gray-600 hover:text-orange-600 cursor-pointer" />
                    )}
                  </a>
                </div>
              ) : (
                <a
                  href='/login'
                  className="text-sm text-gray-700 hover:text-orange-600"
                >
                  Login
                </a>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-orange-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};