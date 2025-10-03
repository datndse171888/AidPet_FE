import React from 'react';
import { User } from 'lucide-react';
import { AccountResponse } from '../../../types/User';


interface ProfileHeaderProps {
  user: AccountResponse;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8">
      <div className="flex items-center space-x-4">
        <div className="bg-white rounded-full p-4">
          {user?.image ? (
            <img
              src={user.image}
              alt="User avatar"
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <User className="h-16 w-16 text-gray-600" />
          )}
        </div>
        <div className="text-white">
          <h1 className="text-2xl font-bold">
            {user?.userName || 'User Name'}{' '}{user.role ? `(${user.role})` : '(Role)'}
          </h1>
          <p className="text-orange-100">{user?.email || 'Email'}</p>
        </div>
      </div>
    </div>
  );
};