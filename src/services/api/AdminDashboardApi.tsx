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
  // Prefer stable backend: AdminDashboardController
  getDashboardStats: () => {
    return api.get<DashboardStats>('admin/dashboard/stats');
  },

  // Get recent activity
  getRecentActivity: (limit: number = 10) => {
    // Temporarily use static fallback by hitting a safe endpoint and mapping client-side
    return api.get<any>('admin/dashboard/stats');
  },

  // Get system health status
  getSystemHealth: () => {
    // Use safe stats endpoint; UI will fallback defaults if shape differs
    return api.get<any>('admin/dashboard/stats');
  },

  // Get analytics data
  getAnalytics: (period: 'week' | 'month' | 'year' = 'month') => {
    return api.get<any>('admin/dashboard/stats');
  },

  // Get today's summary
  getTodaySummary: () => {
    return api.get<any>('admin/dashboard/stats');
  },

  // Get quick stats for cards (map to analytics summary)
  getQuickStats: async () => {
    const res = await api.get<any>('admin/analytics/summary');
    const revenue = await api.get<any>('admin/analytics/revenue');
    const s = res.data || {};
    const r = revenue.data || {};
    const data = {
      totalUsers: s.totalUsers ?? 0,
      totalPosts: s.totalPosts ?? 0,
      pendingPosts: 0,
      totalViews: 0,
      change: {
        users: 0,
        posts: 0,
        pending: 0,
        views: 0,
      },
    };
    return { data } as { data: typeof data };
  }
};
