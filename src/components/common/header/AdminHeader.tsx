import React from 'react'
import { Bell, Search, User } from 'lucide-react';
import { navigationService } from '../../../services/navigator/NavigationService';
import { AccountResponse } from '../../../types/User';

export const AdminHeader: React.FC = () => {

    const userString = localStorage.getItem('user');
    const user: AccountResponse = userString ? JSON.parse(userString) : null;

    const handleProfileClick = () => {
        navigationService.goTo('/admin/profile');
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-semibold text-gray-900">Admin Dashboard</h2>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            3
                        </span>
                    </button>

                    {/* User Menu */}
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            {user?.image ? (
                                <img
                                    src={user.image}
                                    alt="Admin avatar"
                                    className="h-8 w-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-orange-300 transition-all"
                                    onClick={handleProfileClick}
                                />
                            ) : (
                                <div
                                    className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-200 transition-colors"
                                    onClick={handleProfileClick}
                                >
                                    <User className="h-4 w-4 text-orange-600" />
                                </div>
                            )}

                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-gray-900">{user?.userName || 'Admin'}</p>
                                <p className="text-xs text-gray-500">Administrator</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
