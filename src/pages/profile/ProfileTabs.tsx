import React from 'react';
import { User, Settings, Newspaper, Heart, FileText } from 'lucide-react';
import { useAuth } from '../../hooks/AuthorizationRoute';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  const user = useAuth();

  const baseTabs: Tab[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'adoptions', label: 'Adoptions', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Thêm tabs Posts và Animals nếu user có role SHELTER
  const tabs = user?.role === 'SHELTER'
    ? [
      baseTabs[0], // Profile tab
      { id: 'posts', label: 'Posts', icon: Newspaper },
      { id: 'animals', label: 'Animals', icon: Heart }, // Thêm Animals tab
      baseTabs[1], // Settings tab
    ]
    : baseTabs;

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.id
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};