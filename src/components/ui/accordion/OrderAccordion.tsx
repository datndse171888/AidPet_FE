import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Package, Calendar, DollarSign, CreditCard, ShoppingBag } from 'lucide-react';
import { OrderResponse, OrderDetailResponse } from '../../../types/Order';
import { formatDate, formatPrice } from '../../../utils/FormatUtil';
import { OrderFeedbackModal, getSavedOrderFeedback, OrderFeedback } from '../modal/OrderFeedbackModal';

interface OrderAccordionProps {
  order: OrderResponse;
  productNameById?: Record<string, string>;
}

export const OrderAccordion: React.FC<OrderAccordionProps> = ({ order, productNameById = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState<OrderFeedback | null>(() => getSavedOrderFeedback(order.orderId));

  const canFeedback = useMemo(() => {
    return order.status === 'COMPLETED';
  }, [order.status]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', label: 'Pending' },
      CONFIRMED: { color: 'bg-blue-100 text-blue-800 border-blue-300', label: 'Confirmed' },
      SHIPPING: { color: 'bg-purple-100 text-purple-800 border-purple-300', label: 'Shipping' },
      COMPLETED: { color: 'bg-green-100 text-green-800 border-green-300', label: 'Completed' },
      CANCELLED: { color: 'bg-red-100 text-red-800 border-red-300', label: 'Cancelled' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    const normalized = paymentStatus === 'SUCCESS' ? 'PAID' : paymentStatus;
    const statusConfig = {
      PENDING: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', label: 'Payment Pending' },
      PAID: { color: 'bg-green-100 text-green-800 border-green-300', label: 'Paid' },
      FAILED: { color: 'bg-red-100 text-red-800 border-red-300', label: 'Failed' },
      CANCELLED: { color: 'bg-gray-100 text-gray-800 border-gray-300', label: 'Payment Cancelled' }
    };

    const config = statusConfig[normalized as keyof typeof statusConfig] || statusConfig.PENDING;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <CreditCard className="h-3 w-3 mr-1" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header - Always Visible */}
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Order Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
            </div>

            {/* Order Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  Order #{order.orderId.slice(-8)}
                </h3>
                {getStatusBadge(order.status)}
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(order.orderDateTime)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-medium text-gray-900">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="flex-shrink-0 hidden sm:block">
              {getPaymentStatusBadge(order.paymentStatus)}
            </div>

            {/* Expand Icon */}
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Payment Status */}
        <div className="mt-2 sm:hidden">
          {getPaymentStatusBadge(order.paymentStatus)}
        </div>

        {/* Feedback summary (if exists) */}
        {savedFeedback && (
          <div className="mt-3 text-xs text-gray-600">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 mr-2">
              ⭐ {savedFeedback.rating}/5
            </span>
            <span className="truncate align-middle">“{savedFeedback.comment || 'Đã gửi đánh giá'}”</span>
          </div>
        )}
      </div>

      {/* Expanded Content - Order Details */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          <div className="p-4 space-y-4">
            {/* Order Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-3">
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Order ID</span>
                <p className="text-sm font-mono text-gray-900 break-all">{order.orderId}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Order Date</span>
                <p className="text-sm text-gray-900">{formatDate(order.orderDateTime)}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Items</span>
                <p className="text-sm text-gray-900">
                  {order.orderDetails.reduce((sum, detail) => sum + detail.quantity, 0)} items
                </p>
              </div>
            </div>

            {/* Order Details */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Order Details
              </h4>
              
              <div className="space-y-2">
                {order.orderDetails.map((detail: OrderDetailResponse, index: number) => (
                  <div
                    key={detail.orderDetailId || index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            Product: {productNameById[detail.productId] || detail.productId}
                          </p>
                          <p className="text-xs text-gray-600">
                            Quantity: {detail.quantity} × {formatPrice(detail.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatPrice(detail.subTotal)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-gray-900">Total Amount:</span>
                  <span className="text-lg font-bold text-orange-600">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons (if needed) */}
            <div className="flex justify-end space-x-2 pt-2">
              {order.status === 'PENDING' && (
                <button className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors">
                  Cancel Order
                </button>
              )}
              {order.paymentStatus === 'FAILED' && (
                <button className="px-3 py-1 text-xs font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded transition-colors">
                  Retry Payment
                </button>
              )}
              {canFeedback && (
                <button
                  onClick={(e) => { e.stopPropagation(); setFeedbackOpen(true); }}
                  className="px-3 py-1 text-xs font-medium text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 rounded transition-colors"
                >
                  Leave Feedback
                </button>
              )}
              <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
      <OrderFeedbackModal
        isOpen={isFeedbackOpen}
        orderId={order.orderId}
        onClose={() => setFeedbackOpen(false)}
        onSaved={(fb) => setSavedFeedback(fb)}
      />
    </div>
  );
};