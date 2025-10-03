import React, { useState } from 'react';
import { Mail, Phone, PawPrint, BookUser, House, Info } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { FormErrors } from '../../types';
import { ShelterRequest } from '../../types/Shelter';
import { shelterApi } from '../../services/api/ShelterApi';
import { navigationService } from '../../services/navigator/NavigationService';
import { useLocation } from 'react-router-dom';

export const CreateShelter: React.FC = () => {

    const location = useLocation();
        
    const [formData, setFormData] = useState<ShelterRequest>({
        uuid: location.state.uuid,
        shelterName: '',
        address: '',
        phone: '',
        email: '',
        description: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            // Simulate API call
            const response = await shelterApi.createShelter(formData);
            console.log('Shelter created:', response.data);
            // On success, redirect or show success message
            alert('Registration successful!');
            navigationService.goTo('/login');
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
        <div className="bg-gray-50 flex flex-col justify-center w-full h-full">
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
                    Register Your Shelter
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Register your animal shelter to help pets find loving homes
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                    {errors.general && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                            {errors.general}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Shelter Name"
                            name="shelterName"
                            type="text"
                            value={formData.shelterName}
                            onChange={handleChange}
                            error={errors.full}
                            icon={<House className="h-5 w-5 text-gray-400" />}
                            placeholder='Pet House'
                            required
                        />

                        <Input
                            label="Shelter Email"
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
                            label="Shelter Phone Number"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            icon={<Phone className="h-5 w-5 text-gray-400" />}
                            autoComplete="tel"
                            required
                            placeholder="09xxxxxxxx"
                        />

                        <Input
                            label="Shelter Address"
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

                        <Input
                            label="Description"
                            name="description"
                            type="text"
                            value={formData.description}
                            onChange={handleChange}
                            error={errors.description}
                            icon={<Info className="h-5 w-5 text-gray-400" />}
                            autoComplete="address"
                            required
                            placeholder="We are a non-profit organization dedicated to..."
                        />

                        <div className="flex space-x-4">
                            <Button
                                type="submit"
                                className="flex-1"
                                size="lg"
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                Register Shelter
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};