import React, { useState } from 'react'
import { FormErrors } from '../../types';
import { authApi } from '../../services/api/AuthApi';
import { Mail, PawPrint } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/input/Input';
import { navigationService } from '../../utils/NavigationService';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
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
      const response = await authApi.forgotPassword(email);
      console.log('Logging in with:', response.data);
      // On success, redirect or show success message
      // alert('Login successful!');
      navigationService.goTo('/login');
    } catch (error) {
      setErrors({ general: 'Failed to send reset link. Please try again.' });
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
          Forgot your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
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
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                if (errors['email']) {
                  setErrors(prev => ({ ...prev, ['email']: '' }));
                }
              }}
              error={errors.email}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              placeholder='email@gmail.com'
              required
              autoComplete="email"
            />

            <div className="flex items-center justify-center">
                <a href="/login" className="font-medium text-orange-600 hover:text-orange-500">
                  Did you remember your password?
                </a>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={isLoading}
              disabled={isLoading}
            >
              Send reset link
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}