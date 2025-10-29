import React from 'react';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, PawPrint } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">Aid Pet</span>
            </div>
            <p className="text-gray-300 text-sm">
              Finding loving homes for animals in need. Every adoption creates a bond that lasts a lifetime.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Lot E2a-7, D1 Street, Saigon Hi-Tech Park, Tang Nhon Phu Ward, HCMC</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>0857575431</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>nghialncse170125@fpt.edu.vn</span>
              </div>
            </div>
          </div>

          {/* Adoption Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Adoption Info</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Adoption Process
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Care Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Health Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <p className="text-sm text-gray-300">
              Stay updated with our latest rescues and success stories!
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-300">
          <p>&copy; 2025 Aid Pet. All rights reserved. Made with ❤️ for animals in need.</p>
        </div>
      </div>
    </footer>
  );
};