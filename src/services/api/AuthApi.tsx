import { LoginFormData, AccountResponse, RegisterFormData, VerifyTokenRequest, ForgotPasswordRequest, ResetPasswordRequest, ChangePasswordRequest } from "../../types/User";
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

  changePassword: (data: ChangePasswordRequest) => {
    return api.post('/users/change-password', data);
  },

  forgotPassword: (data: ForgotPasswordRequest) => {
    return api.post('/users/forgot-password', data);
  },

  resetPassword: (data: ResetPasswordRequest, token: string) => {
    return api.post('/user/reset-password', data, { headers: { Authorization: `Bearer ${token}` } });
  },
};

// Export the configured instance as default