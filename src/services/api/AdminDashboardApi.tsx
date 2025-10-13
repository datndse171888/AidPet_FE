import { api } from "../../utils/Axios";

// Dashboard statistics response types
export interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  pendingPosts: number;
  approvedPosts: number;
  totalViews: number;
  activeToday: number;
  totalAnimals: number;
  pendingAnimals: number;
  totalAdoptions: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface RecentActivity {
  id: string;
  type: 'post_submitted' | 'user_registered' | 'post_approved' | 'system_alert' | 'animal_approved' | 'adoption_created';
  message: string;
  time: string;
  icon: string;
  color: string;
}

export interface SystemHealth {
  databaseStatus: 'healthy' | 'warning' | 'error';
  serverPerformance: 'optimal' | 'good' | 'slow';
  storageUsage: number; // percentage
  apiResponseTime: number; // milliseconds
}

export interface AnalyticsData {
  userGrowth: Array<{ date: string; count: number }>;
  postViews: Array<{ date: string; views: number }>;
  adoptionStats: Array<{ status: string; count: number }>;
  revenueData: Array<{ month: string; revenue: number }>;
}

// Admin Dashboard API methods
export const adminDashboardApi = {
  // Get dashboard statistics
  getDashboardStats: () => {
    return api.get<DashboardStats>('/admin/dashboard/stats');
  },

  // Get recent activity
  getRecentActivity: (limit: number = 10) => {
    return api.get<RecentActivity[]>(`/admin/dashboard/activity?limit=${limit}`);
  },

  // Get system health status
  getSystemHealth: () => {
    return api.get<SystemHealth>('/admin/dashboard/health');
  },

  // Get analytics data
  getAnalytics: (period: 'week' | 'month' | 'year' = 'month') => {
    return api.get<AnalyticsData>(`/admin/dashboard/analytics?period=${period}`);
  },

  // Get today's summary
  getTodaySummary: () => {
    return api.get<{
      activeUsers: number;
      newPosts: number;
      postsApproved: number;
      pageViews: number;
      newAnimals: number;
      newAdoptions: number;
    }>('/admin/dashboard/today-summary');
  },

  // Get quick stats for cards
  getQuickStats: () => {
    return api.get<{
      totalUsers: number;
      totalPosts: number;
      pendingPosts: number;
      totalViews: number;
      change: {
        users: number;
        posts: number;
        pending: number;
        views: number;
      };
    }>('/admin/dashboard/quick-stats');
  }
};
