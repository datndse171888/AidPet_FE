import { AccountResponse } from "../../types/User";
import { DataResponse } from "../../types/DataResponse";
import { api } from "../../utils/Axios";

// User management request types
export interface UserUpdateRequest {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  gender?: boolean;
  imgUrl?: string;
  isActive?: boolean;
}

export interface UserFilterRequest {
  role?: 'USER' | 'ADMIN' | 'SHELTER' | 'SPONSOR';
  status?: 'active' | 'inactive' | 'pending';
  dateFrom?: string;
  dateTo?: string;
  page: number;
  size: number;
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  byRole: {
    USER: number;
    ADMIN: number;
    SHELTER: number;
    SPONSOR: number;
  };
}

// Admin User API methods
export const adminUserApi = {
  // Get all users with pagination
  getAllUsers: (page: number = 0, size: number = 10) => {
    return api.get<DataResponse<AccountResponse>>(`/users/account?page=${page}&size=${size}`);
  },

  // Get users with filters
  getUsersWithFilters: (filters: UserFilterRequest) => {
    return api.post<DataResponse<AccountResponse>>('/admin/users/filter', filters);
  },

  // Get user by ID
  getUserById: (userId: string) => {
    return api.get<AccountResponse>(`/users/${userId}`);
  },

  // Search users by name
  searchUsers: (name: string, page: number = 0, size: number = 10) => {
    return api.get<DataResponse<AccountResponse>>(`/users/search?name=${name}&page=${page}&size=${size}`);
  },

  // Update user information
  updateUser: (userId: string, userData: UserUpdateRequest) => {
    return api.put<AccountResponse>(`/users/account/${userId}`, userData);
  },

  // Update user status (activate/deactivate)
  updateUserStatus: (userId: string, isActive: boolean) => {
    return api.put<AccountResponse>(`/admin/users/${userId}/status`, {
      isActive
    });
  },

  // Delete user
  deleteUser: (userId: string) => {
    return api.delete(`/users/${userId}`);
  },

  // Bulk update user status
  bulkUpdateUserStatus: (userIds: string[], isActive: boolean) => {
    return api.put<{ success: number; failed: number }>('/admin/users/bulk-status', {
      userIds,
      isActive
    });
  },

  // Get user statistics
  getUserStats: () => {
    return api.get<UserStats>('/admin/users/stats');
  },

  // Get users by role
  getUsersByRole: (role: 'USER' | 'ADMIN' | 'SHELTER' | 'SPONSOR', page: number = 0, size: number = 10) => {
    return api.get<DataResponse<AccountResponse>>(`/admin/users/role/${role}?page=${page}&size=${size}`);
  },

  // Get user activity
  getUserActivity: (userId: string, days: number = 30) => {
    return api.get<{
      loginCount: number;
      lastLogin: string;
      postsCreated: number;
      adoptionsRequested: number;
      ordersPlaced: number;
    }>(`/admin/users/${userId}/activity?days=${days}`);
  },

  // Reset user password (admin only)
  resetUserPassword: (userId: string) => {
    return api.post<{ temporaryPassword: string }>(`/admin/users/${userId}/reset-password`);
  },

  // Get user's posts
  getUserPosts: (userId: string, page: number = 0, size: number = 10) => {
    return api.get<DataResponse<any>>(`/admin/users/${userId}/posts?page=${page}&size=${size}`);
  },

  // Get user's adoptions
  getUserAdoptions: (userId: string, page: number = 0, size: number = 10) => {
    return api.get<DataResponse<any>>(`/admin/users/${userId}/adoptions?page=${page}&size=${size}`);
  },

  // Get user's orders
  getUserOrders: (userId: string, page: number = 0, size: number = 10) => {
    return api.get<DataResponse<any>>(`/admin/users/${userId}/orders?page=${page}&size=${size}`);
  }
};




