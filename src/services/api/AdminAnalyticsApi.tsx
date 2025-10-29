import { DataResponse } from "../../types/DataResponse";
import { api } from "../../utils/Axios";

// Analytics data types
export interface UserAnalytics {
  totalUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  activeUsers: number;
  userGrowth: Array<{ date: string; count: number }>;
  usersByRole: {
    USER: number;
    ADMIN: number;
    SHELTER: number;
    SPONSOR: number;
  };
  userRetention: {
    day1: number;
    day7: number;
    day30: number;
  };
}

export interface PostAnalytics {
  totalPosts: number;
  publishedPosts: number;
  pendingPosts: number;
  rejectedPosts: number;
  totalViews: number;
  averageViewsPerPost: number;
  topPosts: Array<{
    id: string;
    title: string;
    views: number;
    author: string;
  }>;
  postsByCategory: Array<{
    category: string;
    count: number;
  }>;
  postTrends: Array<{ date: string; count: number; views: number }>;
}

export interface AnimalAnalytics {
  totalAnimals: number;
  availableAnimals: number;
  adoptedAnimals: number;
  pendingAnimals: number;
  animalsByCategory: Array<{
    category: string;
    count: number;
  }>;
  animalsByShelter: Array<{
    shelter: string;
    count: number;
  }>;
  adoptionRate: number;
  averageTimeToAdoption: number; // days
  animalTrends: Array<{ date: string; added: number; adopted: number }>;
}

export interface AdoptionAnalytics {
  totalAdoptions: number;
  pendingAdoptions: number;
  approvedAdoptions: number;
  rejectedAdoptions: number;
  completedAdoptions: number;
  adoptionSuccessRate: number;
  averageProcessingTime: number; // days
  adoptionsByMonth: Array<{ month: string; count: number }>;
  topAdoptedAnimals: Array<{
    animalId: string;
    animalName: string;
    adoptionCount: number;
  }>;
}

export interface RevenueAnalytics {
  totalRevenue: number;
  revenueThisMonth: number;
  revenueThisYear: number;
  averageOrderValue: number;
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  revenueByMonth: Array<{ month: string; revenue: number; orders: number }>;
  topProducts: Array<{
    productId: string;
    productName: string;
    revenue: number;
    orders: number;
  }>;
  paymentMethods: Array<{
    method: string;
    count: number;
    revenue: number;
  }>;
}

export interface SystemAnalytics {
  systemLoad: number;
  responseTime: number;
  errorRate: number;
  uptime: number;
  dailyActiveUsers: number;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  averageSessionDuration: number;
  topPages: Array<{
    page: string;
    views: number;
    uniqueVisitors: number;
  }>;
  trafficSources: Array<{
    source: string;
    visitors: number;
    percentage: number;
  }>;
}

export interface AnalyticsPeriod {
  startDate: string;
  endDate: string;
  period: 'day' | 'week' | 'month' | 'year';
}

// Admin Analytics API methods
export const adminAnalyticsApi = {
  // Get user analytics
  getUserAnalytics: (period?: AnalyticsPeriod) => {
    const params = period ? `?startDate=${period.startDate}&endDate=${period.endDate}&period=${period.period}` : '';
    return api.get<UserAnalytics>(`/admin/analytics/users${params}`);
  },

  // Get post analytics
  getPostAnalytics: (period?: AnalyticsPeriod) => {
    const params = period ? `?startDate=${period.startDate}&endDate=${period.endDate}&period=${period.period}` : '';
    return api.get<PostAnalytics>(`/admin/analytics/posts${params}`);
  },

  // Get animal analytics
  getAnimalAnalytics: (period?: AnalyticsPeriod) => {
    const params = period ? `?startDate=${period.startDate}&endDate=${period.endDate}&period=${period.period}` : '';
    return api.get<AnimalAnalytics>(`/admin/analytics/animals${params}`);
  },

  // Get adoption analytics
  getAdoptionAnalytics: (period?: AnalyticsPeriod) => {
    const params = period ? `?startDate=${period.startDate}&endDate=${period.endDate}&period=${period.period}` : '';
    return api.get<AdoptionAnalytics>(`/admin/analytics/adoptions${params}`);
  },

  // Get revenue analytics
  getRevenueAnalytics: (period?: AnalyticsPeriod) => {
    const params = period ? `?startDate=${period.startDate}&endDate=${period.endDate}&period=${period.period}` : '';
    return api.get<RevenueAnalytics>(`/admin/analytics/revenue${params}`);
  },

  // Get system analytics
  getSystemAnalytics: (period?: AnalyticsPeriod) => {
    const params = period ? `?startDate=${period.startDate}&endDate=${period.endDate}&period=${period.period}` : '';
    return api.get<SystemAnalytics>(`/admin/analytics/system${params}`);
  },

  // Get comprehensive analytics dashboard
  getDashboardAnalytics: (period?: AnalyticsPeriod) => {
    const params = period ? `?startDate=${period.startDate}&endDate=${period.endDate}&period=${period.period}` : '';
    return api.get<{
      users: UserAnalytics;
      posts: PostAnalytics;
      animals: AnimalAnalytics;
      adoptions: AdoptionAnalytics;
      revenue: RevenueAnalytics;
      system: SystemAnalytics;
    }>(`/admin/analytics/dashboard${params}`);
  },

  // Get analytics summary
  getAnalyticsSummary: () => {
    return api.get<{
      totalUsers: number;
      totalPosts: number;
      totalAnimals: number;
      totalAdoptions: number;
      totalRevenue: number;
      growth: {
        users: number;
        posts: number;
        animals: number;
        adoptions: number;
        revenue: number;
      };
      trends: {
        users: 'up' | 'down' | 'stable';
        posts: 'up' | 'down' | 'stable';
        animals: 'up' | 'down' | 'stable';
        adoptions: 'up' | 'down' | 'stable';
        revenue: 'up' | 'down' | 'stable';
      };
    }>('/admin/analytics/summary');
  },

  // Export analytics data
  exportAnalytics: (type: 'users' | 'posts' | 'animals' | 'adoptions' | 'revenue' | 'system', format: 'csv' | 'excel' | 'pdf', period?: AnalyticsPeriod) => {
    const params = new URLSearchParams({
      type,
      format
    });
    if (period) {
      params.append('startDate', period.startDate);
      params.append('endDate', period.endDate);
      params.append('period', period.period);
    }
    
    return api.get(`/admin/analytics/export?${params.toString()}`, {
      responseType: 'blob'
    });
  },

  // Get real-time analytics
  getRealTimeAnalytics: () => {
    return api.get<{
      activeUsers: number;
      currentPageViews: number;
      systemLoad: number;
      responseTime: number;
      recentActivity: Array<{
        type: string;
        message: string;
        timestamp: string;
      }>;
    }>('/admin/analytics/realtime');
  },

  // Get analytics trends
  getAnalyticsTrends: (metric: 'users' | 'posts' | 'animals' | 'adoptions' | 'revenue', period: 'week' | 'month' | 'year') => {
    return api.get<Array<{ date: string; value: number; change: number }>>(`/admin/analytics/trends?metric=${metric}&period=${period}`);
  }
};




