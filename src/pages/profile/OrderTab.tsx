import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, ShoppingCart } from 'lucide-react';
import { OrderResponse } from '../../types/Order';
import { OrderAccordion } from '../../components/ui/accordion/OrderAccordion';
import { useAuth } from '../../hooks/AuthorizationRoute';
import { orderApi } from '../../services/api/OrderApi';
import { formatPrice } from '../../utils/FormatUtil';

export const OrderTab: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED'>('all');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED'>('all');
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuth();
  const userId = user?.uuid;

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const response = await orderApi.getOrderByUser(userId);
      const data = response.data;
      
      if (data && data.listData && Array.isArray(data.listData)) {
        const normalized = data.listData.map((o: any) => ({
          ...o,
          paymentStatus: o.paymentStatus === 'SUCCESS' ? 'PAID' : o.paymentStatus,
          orderDateTime: typeof o.orderDateTime === 'string' ? o.orderDateTime : (o.orderDateTime ?? '').toString()
        }));
        setOrders(normalized);
      } else {
        console.warn('No orders data found');
        setOrders([]);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      (order.orderId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.orderDateTime || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const normalizedPayment = order.paymentStatus === 'SUCCESS' ? 'PAID' : order.paymentStatus;
    const matchesPayment = paymentFilter === 'all' || normalizedPayment === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    completed: orders.filter(o => o.status === 'COMPLETED').length,
    totalAmount: orders.reduce((sum, o) => sum + o.totalAmount, 0),
    paidOrders: orders.filter(o => (o.paymentStatus === 'PAID' || o.paymentStatus === 'SUCCESS')).length
  };

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'SHIPPING', label: 'Shipping' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'CANCELLED', label: 'Cancelled' }
  ];

  const paymentOptions = [
    { value: 'all', label: 'All Payments' },
    { value: 'PENDING', label: 'Payment Pending' },
    { value: 'PAID', label: 'Paid' },
    { value: 'FAILED', label: 'Failed' },
    { value: 'CANCELLED', label: 'Payment Cancelled' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Orders</h2>
          <p className="text-sm text-gray-600 mt-1">
            Track and manage your pet product orders
          </p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{stats.paidOrders}</div>
          <div className="text-sm text-gray-600">Paid Orders</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-lg font-bold text-purple-600">{formatPrice(stats.totalAmount)}</div>
          <div className="text-sm text-gray-600">Total Spent</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by Order ID or date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value as typeof paymentFilter)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {paymentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-gray-600">Loading orders...</span>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderAccordion
              key={order.orderId}
              order={order}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="text-gray-500 text-lg mb-2">
            {searchQuery || statusFilter !== 'all' || paymentFilter !== 'all'
              ? 'No orders found matching your criteria'
              : 'No orders placed yet'
            }
          </div>
          <p className="text-gray-400">
            {searchQuery || statusFilter !== 'all' || paymentFilter !== 'all'
              ? 'Try adjusting your search or filter settings'
              : 'Start shopping for your pets to see your orders here!'
            }
          </p>
        </div>
      )}
    </div>
  );
};