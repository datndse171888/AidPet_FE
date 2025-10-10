import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Trash2, Plus, Minus, ShoppingCart, Package } from 'lucide-react';
import { ProductDetail, ProductDetailResponse } from '../../types/Product';
import { ProductDetailCard } from '../../components/ui/card/ProductDetailCard';
import { Button } from '../../components/ui/Button';
import { productApi } from '../../services/api/ProductApi';
import { DataResponse } from '../../types/DataResponse';

// Cart item interface for products
interface ProductCartItem {
  product: ProductDetailResponse;
  quantity: number;
}

export const Product: React.FC = () => {
  const [products, setProducts] = useState<ProductDetailResponse[]>([]);
  const [cartItems, setCartItems] = useState<ProductCartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await productApi.getAllProductDetails();
      if (response.status === 200) {
        setProducts(response.data.listData);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.variantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.color.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesColor = selectedColor === '' || product.color === selectedColor;

      const matchesPriceRange = selectedPriceRange === '' ||
        (selectedPriceRange === '0-50' && product.price <= 50) ||
        (selectedPriceRange === '51-100' && product.price > 50 && product.price <= 100) ||
        (selectedPriceRange === '101-200' && product.price > 100 && product.price <= 200) ||
        (selectedPriceRange === '201+' && product.price > 200);

      return matchesSearch && matchesColor && matchesPriceRange;
    });
  }, [products, searchQuery, selectedCategory, selectedColor, selectedPriceRange]);

  // Get unique values for filters
  const colors = [...new Set(products.map(p => p.color).filter(Boolean))];
  const priceRanges = [
    { value: '0-50', label: '$0 - $50' },
    { value: '51-100', label: '$51 - $100' },
    { value: '101-200', label: '$101 - $200' },
    { value: '201+', label: '$201+' }
  ];

  // Cart functionality
  const handleAddToCart = (productDetailId: string) => {
    const product = products.find(p => p.detailId === productDetailId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.product.detailId === productDetailId);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.product.detailId === productDetailId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productDetailId: string) => {
    setCartItems(cartItems.filter(item => item.product.detailId !== productDetailId));
  };

  const handleUpdateQuantity = (productDetailId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productDetailId);
      return;
    }

    setCartItems(cartItems.map(item =>
      item.product.detailId === productDetailId
        ? { ...item, quantity }
        : item
    ));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedPriceRange('');
  };

  // Calculate cart totals
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Package className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Pet Products Store
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Everything your pets need for a happy and healthy life
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters and Cart Summary */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Cart Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Cart Summary</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Items:</span>
                    <span>{totalItems}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total:</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className="w-full mb-2 bg-orange-600 hover:bg-orange-700"
                  disabled={cartItems.length === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleClearCart}
                  disabled={cartItems.length === 0}
                >
                  Clear Cart
                </Button>
              </div>

              {/* Search */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Search Products</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search by name, SKU, or color..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center text-orange-600"
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    {showFilters ? 'Hide' : 'Show'}
                  </button>
                </div>

                <div className={`space-y-4 ${showFilters || 'hidden lg:block'}`}>

                  {/* Color Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <select
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">All Colors</option>
                      {colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <select
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">All Prices</option>
                      {priceRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Products</h1>
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Cart Items */}
            {cartItems.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart</h2>
                <div className="space-y-4">
                  {cartItems.map(({ product, quantity }) => (
                    <div key={product.detailId} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.imageUrl}
                          alt={product.variantName}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=No+Image';
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.variantName}</h3>
                          <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                          <p className="text-sm text-orange-600">${product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUpdateQuantity(product.detailId, quantity - 1)}
                            className="p-1 rounded-md text-gray-500 hover:text-gray-700"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(product.detailId, quantity + 1)}
                            className="p-1 rounded-md text-gray-500 hover:text-gray-700"
                            disabled={quantity >= product.stockQuantity}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveFromCart(product.detailId)}
                            className="p-1 rounded-md text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <span className="ml-3 text-gray-600">Loading products...</span>
              </div>
            ) : filteredProducts.length > 0 ? (
              /* Product Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductDetailCard
                    key={product.detailId}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              /* No Products Found */
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="text-gray-500 text-lg mb-2">
                  {searchQuery || selectedCategory || selectedColor || selectedPriceRange
                    ? 'No products found matching your criteria'
                    : 'No products available right now'
                  }
                </div>
                <p className="text-gray-400 mb-4">
                  {searchQuery || selectedCategory || selectedColor || selectedPriceRange
                    ? 'Try adjusting your search or filter settings'
                    : 'Please check back later for new products'
                  }
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};