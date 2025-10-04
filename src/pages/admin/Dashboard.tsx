import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Heart, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Activity,
  BarChart3
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    pendingPosts: 0,
    approvedPosts: 0,
    totalViews: 0,
    activeToday: 0
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'post_submitted',
      message: 'New post submitted by Shelter123',
      time: '2 minutes ago',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'user_registered',
      message: 'New user registered: john.doe@email.com',
      time: '15 minutes ago',
      icon: Users,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'post_approved',
      message: 'Post "Help Save Abandoned Puppies" approved',
      time: '1 hour ago',
      icon: CheckCircle,
      color: 'text-orange-600'
    },
    {
      id: 4,
      type: 'system_alert',
      message: 'System backup completed successfully',
      time: '2 hours ago',
      icon: Activity,
      color: 'text-purple-600'
    }
  ]);

  // Mock API call - replace with actual API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalPosts: 89,
        pendingPosts: 12,
        approvedPosts: 77,
        totalViews: 15420,
        activeToday: 156
      });
    }, 1000);
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Total Posts',
      value: stats.totalPosts.toString(),
      icon: FileText,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Pending Review',
      value: stats.pendingPosts.toString(),
      icon: Clock,
      color: 'bg-yellow-500',
      change: '-2%',
      changeType: 'decrease'
    },
    {
      title: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+24%',
      changeType: 'increase'
    }
  ];

  const quickActions = [
    {
      title: 'Review Posts',
      description: 'Review pending posts from shelters',
      icon: FileText,
      color: 'bg-orange-500',
      action: () => window.location.href = '/admin/posts'
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: Users,
      color: 'bg-blue-500',
      action: () => console.log('User management')
    },
    {
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: Activity,
      color: 'bg-green-500',
      action: () => window.location.href = '/admin/settings'
    },
    {
      title: 'Analytics',
      description: 'View detailed system analytics',
      icon: BarChart3,
      color: 'bg-purple-500',
      action: () => console.log('Analytics')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening in your AidPet admin panel today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <div className={`text-xs mt-1 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-orange-300 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`${action.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 group-hover:text-orange-600">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Database Status</span>
                </div>
                <span className="text-green-600 text-sm font-medium">Healthy</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Server Performance</span>
                </div>
                <span className="text-green-600 text-sm font-medium">Optimal</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700">Storage Usage</span>
                </div>
                <span className="text-yellow-600 text-sm font-medium">78% Used</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">API Response Time</span>
                </div>
                <span className="text-green-600 text-sm font-medium">120ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`${activity.color} p-1`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button className="w-full mt-4 text-center text-sm text-orange-600 hover:text-orange-700 font-medium">
              View All Activity
            </button>
          </div>

          {/* Today's Summary */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white mt-6">
            <h2 className="text-lg font-semibold mb-4">Today's Summary</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-orange-100">Active Users</span>
                <span className="font-semibold">{stats.activeToday}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-100">New Posts</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-100">Posts Approved</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-100">Page Views</span>
                <span className="font-semibold">2,847</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};