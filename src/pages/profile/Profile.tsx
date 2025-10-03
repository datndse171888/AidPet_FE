import React, { useState } from 'react';
import { AccountResponse } from '../../types/User';
import { ProfileHeader } from '../../components/common/header/ProfileHeader';
import { ProfileTabs } from '../../pages/profile/ProfileTabs';
import { InformationTab } from './InformationTab';
import { SettingTab } from './SettingTab';
import { ShelterPostTab } from './ShelterPostTab';
import { navigationService } from '../../services/navigator/NavigationService';

export const Profile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('profile');
    const userString = localStorage.getItem('user');
    const user: AccountResponse = userString ? JSON.parse(userString) : null;

    const handleProfileUpdate = async (userData: any) => {
        try {
            // Call your API to update profile
            console.log('Updating profile:', userData);
            // Update localStorage if needed
            if (user) {
                const updatedUser = { ...user, ...userData };
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            throw error;
        }
    };

    const handlePasswordChange = async (passwordData: any) => {
        try {
            // Call your API to change password
            console.log('Changing password:', passwordData);
            // In a real app, this would call authApi.changePassword(passwordData)
        } catch (error) {
            console.error('Failed to change password:', error);
            throw error;
        }
    };

    const handleViewPostDetail = (post: any) => {
        // Navigate to post detail page
        console.log('View post detail:', post);
    };

    const handlePostUp = (post: any) => {
        // Handle post promotion/boosting
        console.log('Post up:', post);
    };

    const handleDeletePost = (postId: string) => {
        // Handle post deletion
        console.log('Delete post:', postId);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <InformationTab user={user} onInformationUpdate={handleProfileUpdate} />;
            case 'settings':
                return <SettingTab onPasswordChange={handlePasswordChange} />;
            case 'posts':
                return user.role === 'SHELTER' ? (
                    <ShelterPostTab
                        onViewDetail={handleViewPostDetail}
                        onPostUp={handlePostUp}
                        onDeletePost={handleDeletePost}
                    />
                ) : null;
            default:
                return <InformationTab user={user} onInformationUpdate={handleProfileUpdate} />;
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
                <ProfileHeader user={user} />
                <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="p-6">
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
};