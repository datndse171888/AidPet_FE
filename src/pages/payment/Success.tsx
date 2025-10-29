import React, { useEffect, useState } from 'react';
import { Check, Home, ShoppingCart } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { navigationService } from '../../utils/NavigationService';
import { OrderResponse, OrderUpdateStatusRequest } from '../../types/Order';
import { orderApi } from '../../services/api/OrderApi';

export const Success: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const [callApiRate, setCallApiRate] = useState(0);
  const formData: OrderUpdateStatusRequest = {
    statusOrder: 'PAID',
  };

  useEffect(() => {
    // Show content after component mounts for animation effect
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const updateStatus = async () => {
    try {
      const orderId = localStorage.getItem('orderId') || '';

      if (!orderId) {
        console.error('No orderId found in localStorage');
        return;
      }
      // Call API to update order status
      const response = await orderApi.updateStatus(orderId, formData);
      const data: OrderResponse = response.data;
      console.table(data);
      setCallApiRate(0); // Reset callApiRate on success
    } catch (error) {
      if (callApiRate < 3) {
        setCallApiRate(callApiRate + 1);
        updateStatus(); // Retry updating status
      } else {
        console.error('Max retry attempts reached. Could not update order status.');
      }
      console.error('Error updating order status:', error);
    }
  };

  const handleGoHome = () => {
    navigationService.goTo('/');
  };

  const handleViewOrders = () => {
    navigationService.goTo('/profile?tab=orders');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 p-4">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4 text-6xl animate-pulse">✨</div>
          <div className="absolute top-12 right-8 text-4xl animate-pulse animation-delay-100">🎉</div>
          <div className="absolute bottom-8 left-8 text-5xl animate-pulse animation-delay-200">💚</div>
          <div className="absolute bottom-4 right-4 text-3xl animate-pulse animation-delay-300">🎊</div>
        </div>

        <div className="text-center relative z-10">
          {/* Success Icon Circle */}
          <div className={`relative mb-8 transform transition-all duration-1000 ${showContent ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
            <div className="inline-block">
              {/* Animated Success Circle */}
              <div className="relative">
                {/* Circle Background */}
                <div className="w-32 h-32 mx-auto bg-green-100 rounded-full flex items-center justify-center border-4 border-green-200 animate-pulse-slow">
                  {/* Success Check Icon */}
                  <div className="relative">
                    <Check
                      className="h-16 w-16 text-green-600 animate-checkmark"
                      strokeWidth={3}
                    />
                  </div>
                </div>
              </div>

              {/* Animated Celebration Elements */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-8 left-4 text-green-300 text-sm animate-float">🎉</div>
                <div className="absolute top-12 right-6 text-green-300 text-sm animate-float animation-delay-100">✨</div>
                <div className="absolute bottom-8 left-6 text-green-300 text-sm animate-float animation-delay-200">💚</div>
                <div className="absolute bottom-12 right-4 text-green-300 text-sm animate-float animation-delay-300">🎊</div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className={`text-3xl font-bold text-gray-900 mb-2 transform transition-all duration-700 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
            Payment Successful! 🎉
          </h1>

          {/* Subtitle */}
          <h3 className={`text-lg font-medium text-green-600 mb-4 transform transition-all duration-700 animation-delay-200 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
            Your Order Has Been Confirmed!
          </h3>

          {/* Description */}
          <p className={`text-gray-600 mb-2 transform transition-all duration-700 animation-delay-400 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
            Thank you for your purchase! Your order has been successfully processed.
          </p>
          <p className={`text-sm text-gray-500 mb-8 transform transition-all duration-700 animation-delay-600 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
            You will receive an email confirmation shortly with your order details. 📧
          </p>

          {/* Fun Message */}
          <div className={`bg-green-50 border border-green-200 rounded-lg p-4 mb-6 transform transition-all duration-700 animation-delay-800 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <span className="text-2xl animate-bounce">🛒</span>
              <span className="font-medium">Your furry friends' supplies are on the way!</span>
              <span className="text-2xl animate-bounce animation-delay-500">📦</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-700 animation-delay-1000 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
            <Button
              onClick={handleViewOrders}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>View My Orders</span>
            </Button>

            <Button
              onClick={handleGoHome}
              variant="outline"
              className="border-green-300 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300"
            >
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </Button>
          </div>

          {/* Celebration Animation */}
          <div className="mt-8 flex justify-center space-x-4">
            <div className="text-3xl animate-bounce animation-delay-100">🐾</div>
            <div className="text-3xl animate-bounce animation-delay-200">💚</div>
            <div className="text-3xl animate-bounce animation-delay-300">🎉</div>
          </div>

          {/* Footer Message */}
          <p className={`text-xs text-gray-400 mt-6 transform transition-all duration-700 animation-delay-1200 ${showContent ? 'opacity-100' : 'opacity-0'
            }`}>
            Thank you for choosing AidPet! 🐕💖
          </p>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes checkmark {
          0% { 
            stroke-dasharray: 0 100;
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            stroke-dasharray: 50 100;
            opacity: 1;
            transform: scale(1.1);
          }
          100% { 
            stroke-dasharray: 100 100;
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-checkmark {
          animation: checkmark 1.2s ease-in-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
      `}</style>
    </div>
  );
};