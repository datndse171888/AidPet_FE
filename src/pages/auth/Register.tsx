import React, { useState } from 'react';
import { Mail, Lock, Phone, Check, PawPrint, User, CircleUserRound, BookUser, Mars, Venus } from 'lucide-react';
import { Input, Select } from '../../components/ui/input/Input';
import { Button } from '../../components/ui/Button';
import { FormErrors } from '../../types';
import { RegisterFormData } from '../../types/User';
import { authApi } from '../../services/api/AuthApi';
import { navigationService } from '../../utils/NavigationService';

export const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    userName: '',
    email: '',
    phone: '',
    password: '',
    fullName: '',
    address: '',
    role: 'USER',
    gender: true,
    imgUrl: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    } else if (!/^(09|03|05|07|08)/.test(phoneDigits)) {
      newErrors.phone = 'Phone number must start with 09, 03, 05, 07 or 08';
    }

    if (formData.gender === undefined) {
      newErrors.gender = 'Please select your gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      const response = await authApi.register(formData);
      console.log('Registering with:', response.data);
      // On success, redirect or show success message
      if (formData.role === 'SHELTER') {
        navigationService.goTo('/new-shelter', { state: { uuid: response.data.uuid } });
      } else {
        navigationService.goTo('/login');
      }
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
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
      {/* <div className="bg-orange-500 text-white py-8 mb-8 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Join the PawAdopt Family</h1>
          <p className="text-xl opacity-90">Start your journey to finding the perfect companion</p>
        </div>
      </div> */}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <PawPrint className="h-12 w-12 text-orange-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a
            href='/login'
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Sign in here
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                {step > 1 ? <Check className="h-5 w-5" /> : '1'}
              </div>
              <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                2
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Account Details</span>
              <span>Personal Info</span>
            </div>
          </div>

          {errors.general && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {errors.general}
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-6">
              <Input
                label="Username"
                name="userName"
                type="text"
                value={formData.userName}
                onChange={handleChange}
                error={errors.userName}
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

              <Select
                label='Role'
                name='role'
                value={formData.role}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, role: e.target.value as 'USER' | 'SPONSOR' | 'SHELTER' }));
                }}
                options={[
                  { value: 'USER', label: 'User' },
                  { value: 'SPONSOR', label: 'Sponsor' },
                  { value: 'SHELTER', label: 'Shelter' }
                ]} />

              <Button
                type="button"
                onClick={handleNext}
                className="w-full"
                size="lg"
              >
                Continue
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Fullname"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.full}
                icon={<User className="h-5 w-5 text-gray-400" />}
                placeholder='Nguyen Van A'
                required
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={<Mail className="h-5 w-5 text-gray-400" />}
                placeholder='email123@gmail.com'
                required
                autoComplete='email'
              />

              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                pattern='[0-9]*'
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                icon={<Phone className="h-5 w-5 text-gray-400" />}
                autoComplete="tel"
                required
                placeholder="09xxxxxxxx"
              />

              <Input
                label="Address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
                icon={<BookUser className="h-5 w-5 text-gray-400" />}
                autoComplete="address"
                required
                placeholder="123 Main St, City, Country"
              />

              <Select
                label='Gender'
                name='gender'
                value={formData.gender ? "true" : "false"}
                onChange={(e) => {
                  const value = e.target.value === "true";
                  setFormData(prev => ({
                    ...prev, gender: value
                  }));
                  // Clear error when user selects a value
                  if (errors.gender) {
                    setErrors(prev => ({ ...prev, gender: '' }));
                  }
                }}
                options={[
                  { value: 'true', label: 'Male' },
                  { value: 'false', label: 'Female' }
                ]}
                icon={formData.gender ?
                  <Mars className="h-5 w-5 text-gray-400" /> :
                  <Venus className="h-5 w-5 text-gray-400" />
                }
              />

              <div className="flex space-x-4">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  size="lg"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Create Account
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};