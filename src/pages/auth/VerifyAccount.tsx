import React, { useEffect, useState } from 'react'
import { FormErrors } from '../../types';
import { PawPrint, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/input/Input';
import { navigationService } from '../../services/navigator/NavigationService';
import { VerifyTokenRequest } from '../../types/User';
import { useSearchParams } from 'react-router-dom';
import { authApi } from '../../services/api/AuthApi';

export const VerifyAccount: React.FC = () => {
  const [search] = useSearchParams();
  const token = search.get('token') || '';
  console.log('Token from URL:', token);
  const verifyCode: VerifyTokenRequest = (
    { token: token }
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      verifyAccount();
    } else {
      setErrors({ general: 'No verification token provided.' });
    }
  }, [])

  const verifyAccount = async () => {
    try {
      const response = await authApi.verifyAccount(verifyCode);
      console.log('Verify response:', response.data);
      navigationService.goTo('/login');
    } catch (error) {
      setErrors({ general: 'Verify failed. Please try again.' });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call

      const response = await authApi.verifyAccount(verifyCode);
      console.log('Verify response:', response.data);
      // On success, redirect or show success message
      // alert('Login successful!');
      navigationService.goTo('/login');
    } catch (error) {
      setErrors({ general: 'Verify failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    alert('Resend code functionality not implemented.');
  }

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
          Verify Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a verification code to your email address. Please enter the code below to verify your account.
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
              label="Verification Code"
              type="text"
              value={verifyCode.token}
              icon={<ShieldCheck className="h-5 w-5 text-gray-400" />}
              required
            />

            <div className="flex items-center justify-center">
              You didn't receive a code? {' '}
              <button
                onClick={handleResendCode}
                className="ml-1 font-medium text-orange-600 hover:text-orange-500"
              >
                Click here to resend.
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}