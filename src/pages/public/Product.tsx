import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Trash2, Plus, Minus, ShoppingCart, Package } from 'lucide-react';
import { ProductResponse } from '../../types/Product';
import { ProductCard } from '../../components/ui/card/ProductCard';
import { CheckoutModal } from '../../components/ui/modal/CheckoutModal';
import { Button } from '../../components/ui/Button';
import { productApi } from '../../services/api/ProductApi';
import { OrderDetailItem, OrderRequest, OrderResponse } from '../../types/Order';
import { useAuth } from '../../hooks/AuthorizationRoute';
import { navigationService } from '../../utils/NavigationService';
import { orderApi } from '../../services/api/OrderApi';

export const Product: React.FC = () => {

  //=========================
  // State variables
  //=========================

  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [cartItems, setCartItems] = useState<OrderDetailItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const user = useAuth();

  //=========================
  // Fetch products on component mount
  //=========================

  useEffect(() => {
    fetchProducts();
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('productCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('productCart', JSON.stringify(cartItems));
  }, [cartItems]);

  //=========================
  // Fetch products from API
  //=========================

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await productApi.getAllProducts();
      if (response.status === 200) {
        setProducts(response.data.listData);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //=========================
  // Helper function to get product by ID
  //=========================

  const getProductById = (productId: string): ProductResponse | undefined => {
    return products.find(p => p.productId === productId);
  };

  //=========================
  // Filter functionality
  //=========================

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.variant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
  }, [products, searchQuery, selectedColor, selectedPriceRange]);

  const colors = [...new Set(products.map(p => p.color).filter(Boolean))];
  const priceRanges = [
    { value: '0-50', label: '$0 - $50' },
    { value: '51-100', label: '$51 - $100' },
    { value: '101-200', label: '$101 - $200' },
    { value: '201+', label: '$201+' }
  ];

  //=========================
  // Cart functionality
  //=========================

  const handleAddToCart = (productDetailId: string) => {
    const product = getProductById(productDetailId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.productId === productDetailId);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.productId === productDetailId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { productId: productDetailId, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productDetailId: string) => {
    setCartItems(cartItems.filter(item => item.productId !== productDetailId));
  };

  const handleUpdateQuantity = (productDetailId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productDetailId);
      return;
    }

    setCartItems(cartItems.map(item =>
      item.productId === productDetailId
        ? { ...item, quantity }
        : item
    ));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('productCart');
  };

  //=========================
  // Clear functionality
  //=========================

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedColor('');
    setSelectedPriceRange('');
  };

  //=========================
  // Checkout functionality
  //=========================

  const handleCheckout = () => {
    if (!user?.isAuthenticated) {
      alert('Please login to checkout');
      navigationService.goTo('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setShowCheckoutModal(true);
  };

  const handleSubmitOrder = async (orderData: OrderRequest) => {
    setIsSubmittingOrder(true);
    
    try {
      // Here you would call your order API
      console.log('Submitting order:', orderData);
      
      // Simulate API call
      const response = await orderApi.createOrder(orderData);
      if (response.status !== 200) {
        console.error('Order submission failed:', response.data);
      } else {
        const data: OrderResponse = response.data;
        navigationService.goTo(data.paymentUrl);
        console.log('Order submitted successfully:', data);
      }
      
      // Clear cart after successful order
      handleClearCart();
      setShowCheckoutModal(false);
      
      alert('Order placed successfully! You will receive a confirmation email shortly.');
      
      // Navigate to orders page or profile
      navigationService.goTo('/profile?tab=orders');
      
    } catch (error) {
      console.error('Failed to submit order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  //=========================
  // Calculate totals
  //=========================

  const totalPrice = cartItems.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  //=========================
  // Render component
  //=========================
  
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
                  onClick={handleCheckout}
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

            {/* Cart Items Display */}
            {cartItems.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart ({totalItems} items)</h2>
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 space-y-4">
                  {cartItems.map((item) => {
                    const product = getProductById(item.productId);
                    
                    if (!product) {
                      return (
                        <div key={item.productId} className="text-red-500 text-sm">
                          Product not found (ID: {item.productId})
                        </div>
                      );
                    }

                    return (
                      <div key={item.productId} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                        <img
                          src={product.imgUrl || 'https://via.placeholder.com/64x64?text=No+Image'}
                          alt={product.variant_name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{product.variant_name}</h3>
                          <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                          <p className="text-sm text-gray-600">Color: {product.color}</p>
                          <p className="text-sm text-orange-600">${product.price.toFixed(2)} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUpdateQuantity(product.productId, item.quantity - 1)}
                            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(product.productId, item.quantity + 1)}
                            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            disabled={item.quantity >= product.stock_quantity}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveFromCart(product.productId)}
                            className="p-1 rounded-md text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${(product.price * item.quantity).toFixed(2)}
                          </p>
                          {product.stock_quantity < 10 && (
                            <p className="text-xs text-yellow-600">
                              Only {product.stock_quantity} left
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Cart Total */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-orange-600">${totalPrice.toFixed(2)}</span>
                  </div>
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
                  <ProductCard
                    key={product.productId}
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
                  {searchQuery || selectedColor || selectedPriceRange
                    ? 'No products found matching your criteria'
                    : 'No products available right now'
                  }
                </div>
                <p className="text-gray-400 mb-4">
                  {searchQuery || selectedColor || selectedPriceRange
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

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        cartItems={cartItems}
        products={products}
        onSubmitOrder={handleSubmitOrder}
        totalPrice={totalPrice}
        isSubmitting={isSubmittingOrder}
      />
    </div>
  );
};