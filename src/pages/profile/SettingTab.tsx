import React, { useState } from 'react';
import { Lock, LogOut } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/input/Input';
import { navigationService } from '../../utils/NavigationService';

interface SettingTabProps {
  onPasswordChange?: (passwordData: any) => void;
}

export const SettingTab: React.FC<SettingTabProps> = ({ onPasswordChange }) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }

    try {
      if (onPasswordChange) {
        await onPasswordChange(passwordData);
      }
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('user');
      navigationService.goTo('/login');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>

      {/* Change Password Section */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">Password</h3>
            <p className="text-sm text-gray-500">Update your account password</p>
          </div>
          {!isChangingPassword && (
            <Button
              variant="outline"
              onClick={() => setIsChangingPassword(true)}
            >
              Change Password
            </Button>
          )}
        </div>

        {isChangingPassword && (
          <form className="space-y-4" onSubmit={handlePasswordSubmit}>
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              error={errors.currentPassword}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              required
            />
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              error={errors.newPassword}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              required
            />
            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              error={errors.confirmPassword}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              required
            />
            <div className="flex space-x-4">
              <Button type="submit">Update Password</Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelPasswordChange}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Account Preferences */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive updates about your orders</p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-sm text-gray-500">Receive promotional offers and updates</p>
            </div>
            <input
              type="checkbox"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="border border-red-200 rounded-lg p-4">
        <h3 className="font-semibold text-red-900 mb-4">Account Actions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
            <div>
              <p className="font-medium text-red-900">Log Out</p>
              <p className="text-sm text-red-600">Sign out of your account</p>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-red-900">Delete Account</p>
              <p className="text-sm text-red-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="outline" size="sm">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};