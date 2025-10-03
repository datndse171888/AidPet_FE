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