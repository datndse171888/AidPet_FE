import { LoginFormData, AccountResponse, RegisterFormData, VerifyTokenRequest, ForgotPasswordRequest, ResetPasswordRequest, ChangePasswordRequest, AccountUpdateRequest } from "../../types/User";
import { DataResponse } from "../../types/DataResponse";
import { api } from "../../utils/Axios";

// Auth API methods
export const authApi = {
  login: (credentials: LoginFormData) => {
    return api.post<AccountResponse>('/users/login', credentials);
  },

  register: (userData: RegisterFormData) => {
    return api.post<AccountResponse>('/users/register', userData);
  },

  //   logout: () => {
  //     // Since we're using JWT, logout is handled client-side
  //     // by removing the token from localStorage
  //     return Promise.resolve();
  //   },

  verifyAccount: (token: VerifyTokenRequest) => {
    return api.post<string>('/users/verify-account', token);
  },

  getProfile: (uuid: string) => {
    return api.get<AccountResponse>('/users/' + uuid);
  },

  //   updateProfile: (userData: {
  //     fullName?: string;
  //     phoneNumber?: string;
  //     photoURL?: string;
  //     gender?: string;
  //   }) => {
  //     return api.put('/auth/profile', userData);
  //   },

  changePassword: (data: ChangePasswordRequest) => {
    return api.post('/users/change-password', data);
  },

  forgotPassword: (data: ForgotPasswordRequest) => {
    return api.post('/users/forgot-password', data);
  },

  resetPassword: (data: ResetPasswordRequest, token: string) => {
    return api.post('/users/reset-password', data, { headers: { Authorization: `Bearer ${token}` } });
  },

  // Get all users (admin only)
  getAllUsers: (page: number = 0, size: number = 10) => {
    return api.get<DataResponse<AccountResponse>>(`/users/account?page=${page}&size=${size}`);
  },

  // Search users by name (admin only)
  searchUsers: (name: string, page: number = 0, size: number = 10) => {
    return api.get<DataResponse<AccountResponse>>(`/users/search?name=${name}&page=${page}&size=${size}`);
  },

  // Update user account (admin only)
  updateUser: (userId: string, userData: AccountUpdateRequest) => {
    return api.put<AccountResponse>(`/users/account/${userId}`, userData);
  },

  // Delete user (admin only)
  deleteUser: (userId: string) => {
    return api.delete(`/users/${userId}`);
  },

  // Get user by email
  getUserByEmail: (email: string) => {
    return api.get<AccountResponse>(`/users/getEmail?email=${email}`);
  },

  // Update profile
  updateProfile: (userId: string, userData: AccountUpdateRequest) => {
    return api.put<AccountResponse>(`/users/account/${userId}`, userData);
  },

  // Get user statistics (admin only)
  getUserStats: () => {
    return api.get<{
      totalUsers: number;
      activeUsers: number;
      newUsersToday: number;
      usersByRole: {
        USER: number;
        ADMIN: number;
        SHELTER: number;
        SPONSOR: number;
      };
    }>('/users/stats');
  },

  // Get users by role (admin only)
  getUsersByRole: (role: 'USER' | 'ADMIN' | 'SHELTER' | 'SPONSOR', page: number = 0, size: number = 10) => {
    return api.get<DataResponse<AccountResponse>>(`/users/role/${role}?page=${page}&size=${size}`);
  },

  // Activate/Deactivate user (admin only)
  updateUserStatus: (userId: string, isActive: boolean) => {
    return api.put<AccountResponse>(`/users/${userId}/status`, { isActive });
  },

  // Bulk update user status (admin only)
  bulkUpdateUserStatus: (userIds: string[], isActive: boolean) => {
    return api.put<{ success: number; failed: number }>('/users/bulk-status', {
      userIds,
      isActive
    });
  }
};

// Export the configured instance as default