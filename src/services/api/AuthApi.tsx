import { LoginFormData, AccountResponse, RegisterFormData } from "../../types/User";
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

  getProfile: (uuid: string) => {
    return api.get<AccountResponse>('/user/' + uuid);
  },

//   updateProfile: (userData: {
//     fullName?: string;
//     phoneNumber?: string;
//     photoURL?: string;
//     gender?: string;
//   }) => {
//     return api.put('/auth/profile', userData);
//   },

//   changePassword: (data: {
//     currentPassword: string;
//     newPassword: string;
//   }) => {
//     return api.put('/auth/change-password', data);
//   },

  forgotPassword: (email: string) => {
    return api.post('/users/forgot-password', { email });
  },

  resetPassword: (password: string) => {
    return api.post('/auth/reset-password', { password });
  },
};

// Export the configured instance as default