import React, { useEffect, useState } from 'react';
import { Search, PawPrint, Menu, X, CircleUser } from 'lucide-react';
import { AccountResponse } from '../../../types/User';
import { useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isActive, setIsActive] = React.useState<string>('');
  const location = useLocation();
  const userString = localStorage.getItem('user');
  const user: AccountResponse = userString ? JSON.parse(userString) : null;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  // Set active tab based on current URL
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/') {
      setIsActive('');
    } else if (currentPath.startsWith('/news')) {
      setIsActive('news');
    } else if (currentPath === '/cart') {
      setIsActive('cart');
    } else {
      setIsActive('');
    }
  }, [location]);

  const navItems = [
    { key: '', label: 'Home' },
    { key: 'news', label: 'News' },
    { key: 'animal', label: 'Animal' }
  ];

  const handleNavClick = (key: string) => {
    setIsActive(key);
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const handleProfileClick = () => {
    if (user.role === 'ADMIN') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/profile';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">Aid Pet</span>
            </a>
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
                key={item.key}
                href={`/${item.key}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.key);
                  window.location.href = `/${item.key}`;
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive === item.key
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-700 hover:text-orange-600'
                  }`}
              >
                {item.label}
              </a>
            ))}

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <button onClick={handleProfileClick} className="flex items-center">
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt="User avatar"
                        className="h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-orange-300 transition-all cursor-pointer"
                      />
                    ) : (
                      <CircleUser className="h-6 w-6 text-gray-600 hover:text-orange-600 cursor-pointer" />
                    )}
                  </button>
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
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile User Menu */}
            {isAuthenticated && (
              <button
                onClick={handleProfileClick}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                {user.role === 'ADMIN' ? 'Admin Panel' : 'Profile'}
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 md:hidden">
              <div className="px-4 py-4 space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search for animals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  {navItems.map((item) => (
                    <a
                      key={item.key}
                      href={`/${item.key}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.key);
                        window.location.href = `/${item.key}`;
                      }}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive === item.key
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                        }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile Auth */}
                <div className="pt-4 border-t border-gray-200">
                  {isAuthenticated ? (
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        {user?.image ? (
                          <img
                            src={user.image}
                            alt="User avatar"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <CircleUser className="h-6 w-6 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {user?.userName || 'User'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user?.email || 'email@example.com'}
                        </div>
                      </div>
                      <a
                        href="/profile"
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Profile
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <a
                        href="/login"
                        className="block w-full text-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                      >
                        Login
                      </a>
                      <a
                        href="/register"
                        className="block w-full text-center px-4 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                      >
                        Sign Up
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};