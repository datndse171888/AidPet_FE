import React from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';

export const Notfound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4 text-6xl">🐾</div>
          <div className="absolute top-12 right-8 text-4xl">🐾</div>
          <div className="absolute bottom-8 left-8 text-5xl">🐾</div>
          <div className="absolute bottom-4 right-4 text-3xl">🐾</div>
        </div>

        <div className="text-center relative z-10">
          {/* Lost Animal Animation */}
          <div className="relative mb-8">
            <div className="inline-block">
              {/* Lost Dog Character */}
              <div className="relative">
                {/* Dog Body */}
                <div className="w-32 h-32 mx-auto mb-4 relative animate-sway">
                  <div className="text-8xl transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                    🐶
                  </div>
                  
                  {/* Confused Eyes */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-blink"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-blink"></div>
                  </div>
                </div>

                {/* Speech Bubble */}
                <div className="absolute -top-4 -right-8 bg-red-500 text-white text-xs px-3 py-2 rounded-full animate-pulse shadow-lg">
                  Where am I? 🤔
                  <div className="absolute bottom-0 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500 transform translate-y-full"></div>
                </div>

                {/* Lost Tag */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-red-400 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md animate-swing">
                    🏷️ LOST
                  </div>
                </div>
              </div>

              {/* Animated Search Icons */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-8 left-4 text-orange-300 text-sm animate-ping">🔍</div>
                <div className="absolute top-12 right-6 text-orange-300 text-sm animate-ping animation-delay-100">❓</div>
                <div className="absolute bottom-8 left-6 text-orange-300 text-sm animate-ping animation-delay-200">📍</div>
                <div className="absolute bottom-12 right-4 text-orange-300 text-sm animate-ping animation-delay-300">🗺️</div>
              </div>
            </div>
          </div>

          {/* 404 Display */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6 animate-pulse">
            <div className="text-2xl font-bold text-red-600">404</div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-fadeIn">
            Oops! This Pet Got Lost! 🔍
          </h1>
          
          {/* Subtitle */}
          <h3 className="text-lg font-medium text-red-600 mb-4 animate-fadeIn animation-delay-200">
            Page Not Found!
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 mb-2 animate-fadeIn animation-delay-400">
            Looks like this page wandered off from our pack!
          </p>
          <p className="text-sm text-gray-500 mb-8 animate-fadeIn animation-delay-600">
            Our search team couldn't find what you're looking for. �
          </p>

          {/* Fun Message */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 animate-slideUp">
            <div className="flex items-center justify-center space-x-2 text-orange-700">
              <span className="text-2xl animate-wander">🐕</span>
              <span className="font-medium">"I'm not lost, I'm just exploring!"</span>
              <span className="text-2xl animate-wander animation-delay-500">🦴</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 hover:scale-105 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 hover:scale-105 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </button>
          </div>

          {/* Search & Rescue Squad */}
          <div className="mt-8 flex justify-center space-x-4">
            <div className="text-3xl animate-search-bounce animation-delay-100">🐱</div>
            <div className="text-3xl animate-search-bounce animation-delay-200">🐰</div>
            <div className="text-3xl animate-search-bounce animation-delay-300">🐦</div>
          </div>
          
          {/* Footer Message */}
          <p className="text-xs text-gray-400 mt-6 animate-fadeIn animation-delay-1000">
            AidPet Search & Rescue Team 🔍
          </p>
        </div>
      </div>

      {/* Custom Animations Styles */}
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(-3deg) translateY(-5px); }
          75% { transform: rotate(3deg) translateY(-5px); }
        }
        
        @keyframes wander {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes search-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-sway {
          animation: sway 3s ease-in-out infinite;
        }
        
        .animate-wander {
          animation: wander 2.5s ease-in-out infinite;
        }
        
        .animate-search-bounce {
          animation: search-bounce 2s ease-in-out infinite;
        }
        
        .animate-swing {
          animation: swing 1.5s ease-in-out infinite;
        }
        
        .animate-blink {
          animation: blink 3s ease-in-out infinite;
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