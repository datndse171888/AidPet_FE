import React, { useState } from 'react';
import { Lock, PawPrint, CircleUserRound } from 'lucide-react';
import { Input } from '../../components/ui/input/Input';
import { Button } from '../../components/ui/Button';
import { FormErrors } from '../../types';
import { LoginFormData } from '../../types/User';
import { authApi } from '../../services/api/AuthApi';
import { navigationService } from '../../utils/NavigationService';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    userName: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      const response = await authApi.login(formData);
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));

      // console.log('Logging in with:', response.data.token);
      // On success, redirect or show success message
      // alert('Login successful!');

      // Redirect based on role
      if (userData.role === 'ADMIN') {
        navigationService.goTo('/admin');
      } else {
        navigationService.goTo('/');
      }
      
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a
            href='/register'
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            create a new account
          </a>
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
              label="Username"
              name="userName"
              type="text"
              value={formData.userName}
              onChange={handleChange}
              error={errors.email}
              icon={<CircleUserRound className="h-5 w-5 text-gray-400" />}
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              required
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-orange-600 hover:text-orange-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={isLoading}
              disabled={isLoading}
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};