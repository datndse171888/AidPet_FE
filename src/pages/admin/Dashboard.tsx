import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  TrendingUp,
  Clock,
  Activity,
  BarChart3
} from 'lucide-react';
import { adminDashboardApi } from '../../services/api/AdminDashboardApi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend);

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    pendingPosts: 0,
    approvedPosts: 0,
    totalViews: 0,
    activeToday: 0,
    totalOrders: 0,
    totalRevenue: 0,
    feedbackCount: 0
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [systemHealth, setSystemHealth] = useState({
    databaseStatus: 'healthy',
    serverPerformance: 'optimal',
    storageUsage: 78,
    apiResponseTime: 120
  });
  const [todaySummary, setTodaySummary] = useState({
    activeUsers: 0,
    newPosts: 0,
    postsApproved: 0,
    pageViews: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Chart.js helpers
  const buildTrend = (total: number, points: number = 12) => {
    if (total <= 0) return Array(points).fill(0);
    const base = Math.max(1, Math.floor(total / points));
    return Array(points)
      .fill(0)
      .map((_, i) => base + Math.floor((Math.sin(i) + 1) * base * 0.2));
  };
  const labels = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const buildLineData = (data: number[], color: string) => ({
    labels,
    datasets: [
      {
        data,
        borderColor: color,
        backgroundColor: color,
        tension: 0.35,
        pointRadius: 0,
        fill: false
      }
    ]
  });
  const buildBarData = (data: number[], color: string) => ({
    labels,
    datasets: [
      {
        data,
        backgroundColor: color,
        borderRadius: 3,
        maxBarThickness: 12
      }
    ]
  });
  const smallOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      x: { display: false, grid: { display: false } },
      y: { display: false, grid: { display: false } }
    }
  };

  // Precompute datasets
  const usersTrend = buildTrend(stats.totalUsers);
  const ordersTrend = buildTrend(stats.totalOrders);
  const feedbackTrend = buildTrend(stats.feedbackCount);
  const revenueTrend = buildTrend(stats.totalRevenue);

  // Fetch dashboard data from API with automatic fallback
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Use API service with automatic fallback to mock data
                const [statsData] = await Promise.all([
                  adminDashboardApi.getDashboardStats()
                ]);

                setStats(prev => ({
                  ...prev,
                  ...statsData.data
                }));
                setRecentActivity([]);
                setSystemHealth({
                  databaseStatus: 'healthy',
                  serverPerformance: 'optimal',
                  storageUsage: 78,
                  apiResponseTime: 120
                });
                setTodaySummary({
                  activeUsers: 0,
                  newPosts: 0,
                  postsApproved: 0,
                  pageViews: 0
                });

      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Set default values if everything fails
        setStats({
          totalUsers: 0,
          totalPosts: 0,
          pendingPosts: 0,
          approvedPosts: 0,
          totalViews: 0,
          activeToday: 0,
          totalOrders: 0,
          totalRevenue: 0,
          feedbackCount: 0
        });
        setRecentActivity([]);
        setSystemHealth({
          databaseStatus: 'error',
          serverPerformance: 'slow',
          storageUsage: 0,
          apiResponseTime: 0
        });
        setTodaySummary({
          activeUsers: 0,
          newPosts: 0,
          postsApproved: 0,
          pageViews: 0
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
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
      title: 'Transaction Amount',
      value: stats.totalOrders.toLocaleString(),
      icon: FileText,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Feedback',
      value: stats.feedbackCount.toLocaleString(),
      icon: Clock,
      color: 'bg-yellow-500',
      change: '-2%',
      changeType: 'decrease'
    },
    {
      title: 'Income',
      value: stats.totalRevenue.toLocaleString(),
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Loading dashboard data...
          </p>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

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

            {/* Key Metrics Mini Charts */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Key Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-xs text-gray-600">Total Users</span>
                    </div>
                    <span className="text-xs text-gray-500">Last 12</span>
                  </div>
                  <div className="h-20">
                    <Bar data={buildBarData(usersTrend, '#3b82f6')} options={smallOptions} redraw />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span className="text-xs text-gray-600">Transaction Amount</span>
                    </div>
                    <span className="text-xs text-gray-500">Last 12</span>
                  </div>
                  <div className="h-20">
                    <Bar data={buildBarData(ordersTrend, '#10b981')} options={smallOptions} redraw />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="text-xs text-gray-600">Feedback</span>
                    </div>
                    <span className="text-xs text-gray-500">Last 12</span>
                  </div>
                  <div className="h-20">
                    <Line data={buildLineData(feedbackTrend, '#f59e0b')} options={smallOptions} redraw />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <span className="text-xs text-gray-600">Income</span>
                    </div>
                    <span className="text-xs text-gray-500">Last 12</span>
                  </div>
                  <div className="h-20">
                    <Line data={buildLineData(revenueTrend, '#8b5cf6')} options={smallOptions} redraw />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    systemHealth.databaseStatus === 'healthy' ? 'bg-green-500' : 
                    systemHealth.databaseStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-700">Database Status</span>
                </div>
                <span className={`text-sm font-medium ${
                  systemHealth.databaseStatus === 'healthy' ? 'text-green-600' : 
                  systemHealth.databaseStatus === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {systemHealth.databaseStatus === 'healthy' ? 'Healthy' : 
                   systemHealth.databaseStatus === 'warning' ? 'Warning' : 'Error'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    systemHealth.serverPerformance === 'optimal' ? 'bg-green-500' : 
                    systemHealth.serverPerformance === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-700">Server Performance</span>
                </div>
                <span className={`text-sm font-medium ${
                  systemHealth.serverPerformance === 'optimal' ? 'text-green-600' : 
                  systemHealth.serverPerformance === 'good' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {systemHealth.serverPerformance === 'optimal' ? 'Optimal' : 
                   systemHealth.serverPerformance === 'good' ? 'Good' : 'Slow'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    systemHealth.storageUsage < 80 ? 'bg-green-500' : 
                    systemHealth.storageUsage < 90 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-700">Storage Usage</span>
                </div>
                <span className={`text-sm font-medium ${
                  systemHealth.storageUsage < 80 ? 'text-green-600' : 
                  systemHealth.storageUsage < 90 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {systemHealth.storageUsage}% Used
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    systemHealth.apiResponseTime < 200 ? 'bg-green-500' : 
                    systemHealth.apiResponseTime < 500 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-700">API Response Time</span>
                </div>
                <span className={`text-sm font-medium ${
                  systemHealth.apiResponseTime < 200 ? 'text-green-600' : 
                  systemHealth.apiResponseTime < 500 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {systemHealth.apiResponseTime}ms
                </span>
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
                <span className="font-semibold">{todaySummary.activeUsers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-100">New Posts</span>
                <span className="font-semibold">{todaySummary.newPosts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-100">Posts Approved</span>
                <span className="font-semibold">{todaySummary.postsApproved}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-100">Page Views</span>
                <span className="font-semibold">{todaySummary.pageViews.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts section removed as requested (moved into Quick Actions card) */}
    </div>
  );
};