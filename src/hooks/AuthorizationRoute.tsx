import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AccountResponse } from "../types/User";

// Hook để lấy thông tin user (bạn có thể thay đổi logic này)
interface AuthorizedUser {
  uuid: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'STAFF' | 'SPONSOR' | 'SHELTER';
  isAuthenticated: boolean;
}

export const useAuth = (): AuthorizedUser | null => {
  // Ví dụ: lấy từ localStorage hoặc context
  const userDataString = localStorage.getItem('user');
  
  if (!userDataString) return null;
  
  try {
    const userData: AccountResponse = JSON.parse(userDataString);
    const role = userData.role as 'USER' | 'ADMIN' | 'STAFF' | 'SPONSOR' | 'SHELTER';
    
    return {
      uuid: userData.uuid || '',
      email: userData.email || '',
      role: role || 'USER',
      isAuthenticated: true
    };
  } catch (error) {
    return null;
  }
};

// Props cho AuthorizationRoute
interface AuthorizationRouteProps {
  children: React.ReactNode;
  requiredRoles?: ('USER' | 'ADMIN' | 'STAFF' | 'SPONSOR' | 'SHELTER')[];
  requireAuth?: boolean;
  redirectTo?: string;
}

// Component Authorization
export const AuthorizationRoute: React.FC<AuthorizationRouteProps> = ({
  children,
  requiredRoles = [],
  requireAuth = true,
  redirectTo = '/login'
}) => {
  const user: AuthorizedUser | null = useAuth();
  const location = useLocation();

  // Nếu yêu cầu đăng nhập nhưng user chưa đăng nhập
  if (requireAuth && !user?.isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Nếu có yêu cầu role cụ thể
  if (requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.includes(user.role);
    
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

// Component cho trang Unauthorized
export const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Unauthorized Access</h3>
          <p className="mt-1 text-sm text-gray-500">
            You don't have permission to access this page.
          </p>
          <div className="mt-6">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Higher Order Component để wrap component cần authorization
export const withAuthorization = (
  WrappedComponent: React.ComponentType<any>,
  requiredRoles?: ('USER' | 'ADMIN' | 'STAFF' | 'SPONSOR' | 'SHELTER')[],
  requireAuth: boolean = true
) => {
  return (props: any) => (
    <AuthorizationRoute requiredRoles={requiredRoles} requireAuth={requireAuth}>
      <WrappedComponent {...props} />
    </AuthorizationRoute>
  );
};