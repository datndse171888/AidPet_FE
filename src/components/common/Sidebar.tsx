import React from 'react';
import { PawPrint, LayoutDashboard, FileText, User, Settings, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { navigationService } from '../../services/navigator/NavigationService';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/admin',
      key: 'dashboard'
    },
    {
      icon: FileText,
      label: 'Post Manage',
      path: '/admin/posts',
      key: 'posts'
    },
    {
      icon: Heart,
      label: 'Animal Manage',
      path: '/admin/animals',
      key: 'animals'
    },
    {
      icon: User,
      label: 'Profile',
      path: '/admin/profile',
      key: 'profile'
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/admin/settings',
      key: 'settings'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const handleItemClick = (path: string) => {
    navigationService.goTo(path);
  };

  return (
    <div className={`bg-gradient-to-b from-orange-500 to-orange-600 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'
      } h-screen fixed left-0 top-0 shadow-lg z-30 flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-orange-400">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : ''}`}>
            <PawPrint className="h-8 w-8 text-white" />
            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold text-white">Aid Pet</h1>
                <p className="text-xs text-orange-100">Admin Panel</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 bg-white text-orange-600 rounded-full p-1.5 shadow-lg hover:bg-orange-50 transition-colors z-10 border-2 border-orange-200"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Navigation Menu */}
      <nav className="mt-8 px-2">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.key}>
                <button
                  onClick={() => handleItemClick(item.path)}
                  className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${active
                      ? 'bg-orange-400 bg-opacity-50 text-white shadow-md'
                      : 'text-orange-100 hover:bg-orange-400 hover:bg-opacity-30 hover:text-white'
                    }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={`h-5 w-5 ${collapsed ? 'mx-auto' : 'mr-3'} ${active ? 'text-white' : 'text-orange-200 group-hover:text-white'
                    }`} />

                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}

                  {active && !collapsed && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="mt-auto p-4">
          <div className="bg-orange-400 bg-opacity-30 rounded-lg p-3">
            <p className="text-xs text-orange-100 text-center">
              Admin Dashboard v1.0
            </p>
            <p className="text-xs text-orange-200 text-center mt-1">
              © 2024 AidPet
            </p>
          </div>
        </div>
      )}
    </div>
  );
};