import React, { useState } from 'react';
import { Save, Edit, User, Mail, Phone, MapPin, UserCog } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/input/Input';
import { AccountResponse } from '../../types/User';

interface AdminProfileProps {
    onInformationUpdate?: (userData: any) => void;
}

export const AdminProfile: React.FC<AdminProfileProps> = ({ onInformationUpdate }) => {
    const userString = localStorage.getItem('user');
    const user: AccountResponse = userString ? JSON.parse(userString) : null;

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (onInformationUpdate) {
            try {
                await onInformationUpdate(formData);
                setIsEditing(false);

                // Update localStorage
                if (user) {
                    const updatedUser = { ...user, ...formData };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }
            } catch (error) {
                console.error('Failed to update admin profile:', error);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset form data to original values
        setFormData({
            fullName: user?.fullName || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
        });
    };

    if (!user) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">Admin information not available</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
                    <p className="text-gray-600 mt-1">
                        Manage your administrator account information
                    </p>
                </div>
                {!isEditing && (
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center"
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                    </Button>
                )}
            </div>

            {/* Admin Info Card */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                <div className="flex items-center space-x-4">
                    <div className="bg-white rounded-full p-4">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt="Admin avatar"
                                className="h-16 w-16 rounded-full object-cover"
                            />
                        ) : (
                            <User className="h-16 w-16 text-gray-600" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">
                            {user.userName} (Administrator)
                        </h2>
                        <p className="text-orange-100">
                            {user.email}
                        </p>
                        <div className="flex items-center mt-2">
                            <span className="bg-orange-400 bg-opacity-50 px-3 py-1 rounded-full text-sm font-medium">
                                Admin Access Level
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Information */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <Input
                                label="Username"
                                type="text"
                                value={user.userName}
                                icon={<User className="h-5 w-5 text-gray-400" />}
                                disabled
                            />

                            <Input
                                label="Role"
                                type="text"
                                value={'Administrator'}
                                icon={<UserCog className="h-5 w-5 text-gray-400" />}
                                disabled
                            />

                            <Input
                                label="Full Name"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                icon={<User className="h-5 w-5 text-gray-400" />}
                                required
                            />

                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                icon={<Mail className="h-5 w-5 text-gray-400" />}
                                required
                            />

                            <Input
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                icon={<Phone className="h-5 w-5 text-gray-400" />}
                                required
                            />

                            <Input
                                label="Address"
                                name="address"
                                type="text"
                                value={formData.address}
                                onChange={handleChange}
                                icon={<MapPin className="h-5 w-5 text-gray-400" />}
                                required
                            />
                        </div>

                        <div className="flex space-x-4">
                            <Button type="submit" className="flex items-center">
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancelEdit}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <Input
                            label="Username"
                            type="text"
                            value={user.userName}
                            icon={<User className="h-5 w-5 text-gray-400" />}
                            disabled
                        />

                        <Input
                            label="Role"
                            type="text"
                            value={'Administrator'}
                            icon={<UserCog className="h-5 w-5 text-gray-400" />}
                            disabled
                        />

                        <Input
                            label="Full Name"
                            type="text"
                            value={user.fullName || 'Full Name'}
                            icon={<User className="h-5 w-5 text-gray-400" />}
                            disabled
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            value={user.email || 'email@gmail.com'}
                            icon={<Mail className="h-5 w-5 text-gray-400" />}
                            disabled
                        />

                        <Input
                            label="Phone Number"
                            type="tel"
                            value={user.phone || '0123456789'}
                            icon={<Phone className="h-5 w-5 text-gray-400" />}
                            disabled
                        />

                        <Input
                            label="Address"
                            type="text"
                            value={user.address}
                            icon={<MapPin className="h-5 w-5 text-gray-400" />}
                            disabled
                        />

                    </div>
                )}
            </div>

            {/* Admin Permissions */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Administrator Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-700">Post Management</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-700">User Management</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-700">System Settings</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-700">Analytics Access</span>
                    </div>
                </div>
            </div>
        </div>
    );
};