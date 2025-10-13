import { api } from "../../utils/Axios";
import { DataResponse } from "../../types/DataResponse";

// System settings types
export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  siteLogo: string;
  siteFavicon: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  emailSettings: {
    smtpHost: string;
    smtpPort: number;
    smtpUsername: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
  };
  paymentSettings: {
    vnpayTmnCode: string;
    vnpaySecretKey: string;
    vnpayUrl: string;
    vnpayReturnUrl: string;
  };
  securitySettings: {
    maxLoginAttempts: number;
    lockoutDuration: number; // minutes
    passwordMinLength: number;
    requireEmailVerification: boolean;
    requirePhoneVerification: boolean;
  };
  notificationSettings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

export interface SystemInfo {
  version: string;
  buildDate: string;
  javaVersion: string;
  springBootVersion: string;
  databaseVersion: string;
  uptime: string;
  memoryUsage: {
    used: number;
    total: number;
    percentage: number;
  };
  diskUsage: {
    used: number;
    total: number;
    percentage: number;
  };
}

export interface SystemLog {
  id: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  timestamp: string;
  source: string;
  userId?: string;
  ipAddress?: string;
}

export interface BackupInfo {
  id: string;
  filename: string;
  size: number;
  createdAt: string;
  status: 'completed' | 'failed' | 'in_progress';
  type: 'full' | 'incremental';
}

// Admin System API methods
export const adminSystemApi = {
  // Get system settings
  getSystemSettings: () => {
    return api.get<SystemSettings>('/admin/system/settings');
  },

  // Update system settings
  updateSystemSettings: (settings: Partial<SystemSettings>) => {
    return api.put<SystemSettings>('/admin/system/settings', settings);
  },

  // Get system information
  getSystemInfo: () => {
    return api.get<SystemInfo>('/admin/system/info');
  },

  // Get system logs
  getSystemLogs: (page: number = 0, size: number = 50, level?: string) => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString()
    });
    if (level) params.append('level', level);
    
    return api.get<DataResponse<SystemLog>>(`/admin/system/logs?${params.toString()}`);
  },

  // Clear system logs
  clearSystemLogs: (olderThanDays?: number) => {
    const params = olderThanDays ? `?olderThanDays=${olderThanDays}` : '';
    return api.delete(`/admin/system/logs${params}`);
  },

  // Get backup information
  getBackups: () => {
    return api.get<BackupInfo[]>('/admin/system/backups');
  },

  // Create backup
  createBackup: (type: 'full' | 'incremental' = 'full') => {
    return api.post<BackupInfo>('/admin/system/backups', { type });
  },

  // Restore from backup
  restoreBackup: (backupId: string) => {
    return api.post<{ message: string }>(`/admin/system/backups/${backupId}/restore`);
  },

  // Delete backup
  deleteBackup: (backupId: string) => {
    return api.delete(`/admin/system/backups/${backupId}`);
  },

  // Toggle maintenance mode
  toggleMaintenanceMode: (enabled: boolean, message?: string) => {
    return api.put<{ enabled: boolean; message: string }>('/admin/system/maintenance', {
      enabled,
      message: message || 'System is under maintenance. Please try again later.'
    });
  },

  // Clear cache
  clearCache: (cacheType?: 'all' | 'users' | 'posts' | 'animals') => {
    const params = cacheType ? `?type=${cacheType}` : '';
    return api.post<{ message: string }>(`/admin/system/cache/clear${params}`);
  },

  // Get system health
  getSystemHealth: () => {
    return api.get<{
      status: 'healthy' | 'warning' | 'critical';
      checks: {
        database: 'ok' | 'warning' | 'error';
        redis: 'ok' | 'warning' | 'error';
        storage: 'ok' | 'warning' | 'error';
        email: 'ok' | 'warning' | 'error';
        payment: 'ok' | 'warning' | 'error';
      };
      uptime: string;
      memoryUsage: number;
      diskUsage: number;
    }>('/admin/system/health');
  },

  // Send test email
  sendTestEmail: (email: string) => {
    return api.post<{ message: string }>('/admin/system/test-email', { email });
  },

  // Test payment gateway
  testPaymentGateway: () => {
    return api.post<{ message: string; success: boolean }>('/admin/system/test-payment');
  },

  // Get system statistics
  getSystemStats: () => {
    return api.get<{
      totalUsers: number;
      totalPosts: number;
      totalAnimals: number;
      totalAdoptions: number;
      totalOrders: number;
      totalRevenue: number;
      systemLoad: number;
      responseTime: number;
    }>('/admin/system/stats');
  }
};




