import React, { useState } from 'react'
import { FormErrors } from '../../types';
import { authApi } from '../../services/api/AuthApi';
import { Lock, PawPrint } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { navigationService } from '../../services/navigator/NavigationService';

export const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      const response = await authApi.resetPassword(password);
      console.log('Reset password response:', response.data);
      // On success, redirect or show success message
      // alert('Login successful!');
      navigationService.goTo('/login');
    } catch (error) {
      setErrors({ general: 'Failed to reset password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center w-full h-screen">
      {/* Banner */}
      {/* <div className="bg-orange-500 text-white py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome Back to Aid Pet</h1>
          <p className="text-xl opacity-90">Continue your journey to find the perfect companion</p>
        </div>
      </div> */}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <PawPrint className="h-12 w-12 text-orange-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your new password below. Make sure it's at least 6 characters long and matches the confirmation.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {errors.general}
              </div>
            )}

            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                if (errors['password']) {
                  setErrors(prev => ({ ...prev, ['password']: '' }));
                }
              }}
              error={errors.password}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              required
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (errors['confirmPassword']) {
                  setErrors(prev => ({ ...prev, ['confirmPassword']: '' }));
                }
              }}
              error={errors.confirmPassword}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              required
            />

            <div className="flex items-center justify-center">
              
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={isLoading}
              disabled={isLoading}
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}