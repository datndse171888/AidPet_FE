import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';

export const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 p-4">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4 text-6xl">🐾</div>
          <div className="absolute top-12 right-8 text-4xl">🐾</div>
          <div className="absolute bottom-8 left-8 text-5xl">🐾</div>
          <div className="absolute bottom-4 right-4 text-3xl">🐾</div>
        </div>

        <div className="text-center relative z-10">
          {/* Animated Guard Dog */}
          <div className="relative mb-8">
            <div className="inline-block">
              {/* Dog Character */}
              <div className="relative">
                {/* Dog Body */}
                <div className="w-32 h-32 mx-auto mb-4 relative animate-bounce">
                  <div className="text-8xl transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                    🐕‍🦺
                  </div>
                  
                  {/* Animated Eyes */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Speech Bubble */}
                <div className="absolute -top-4 -right-8 bg-red-500 text-white text-xs px-3 py-2 rounded-full animate-pulse shadow-lg">
                  WOOF! 🚫
                  <div className="absolute bottom-0 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500 transform translate-y-full"></div>
                </div>

                {/* Security Badge */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold shadow-md animate-bounce">
                    🛡️ GUARD
                  </div>
                </div>
              </div>

              {/* Animated Paw Prints */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-8 left-4 text-orange-300 text-sm animate-ping">🐾</div>
                <div className="absolute top-12 right-6 text-orange-300 text-sm animate-ping animation-delay-100">🐾</div>
                <div className="absolute bottom-8 left-6 text-orange-300 text-sm animate-ping animation-delay-200">🐾</div>
                <div className="absolute bottom-12 right-4 text-orange-300 text-sm animate-ping animation-delay-300">🐾</div>
              </div>
            </div>
          </div>

          {/* Error Icon with Animation */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6 animate-pulse">
            <svg className="h-8 w-8 text-red-600 animate-shake" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fadeIn">
            Access Denied! 🚫
          </h1>
          
          {/* Subtitle */}
          <h3 className="text-lg font-medium text-red-600 mb-4 animate-fadeIn animation-delay-200">
            This Area is Protected!
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 mb-2 animate-fadeIn animation-delay-400">
            Our security guard dog says you don't have permission to access this page.
          </p>
          <p className="text-sm text-gray-500 mb-8 animate-fadeIn animation-delay-600">
            Please check your credentials or contact an administrator for access. 🔐
          </p>

          {/* Fun Message */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 animate-slideUp">
            <div className="flex items-center justify-center space-x-2 text-orange-700">
              <span className="text-2xl animate-wiggle">🐶</span>
              <span className="font-medium">Don't worry, our furry friend is just doing their job!</span>
              <span className="text-2xl animate-wiggle animation-delay-500">🦴</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 hover:scale-105 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 hover:scale-105 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </button>
          </div>

          {/* Additional Characters */}
          <div className="mt-8 flex justify-center space-x-4">
            <div className="text-3xl animate-bounce animation-delay-100">🐱</div>
            <div className="text-3xl animate-bounce animation-delay-200">🐰</div>
            <div className="text-3xl animate-bounce animation-delay-300">🐦</div>
          </div>
          
          {/* Footer Message */}
          <p className="text-xs text-gray-400 mt-6 animate-fadeIn animation-delay-1000">
            Protected by the AidPet Security Team 🐕‍🦺
          </p>
        </div>
      </div>

      {/* Custom Animations Styles */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
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
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};