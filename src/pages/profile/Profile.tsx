import React, { useState } from 'react';
import { AccountResponse } from '../../types/User';
import { ProfileHeader } from '../../components/common/header/ProfileHeader';
import { ProfileTabs } from '../../pages/profile/ProfileTabs';
import { InformationTab } from './InformationTab';
import { SettingTab } from './SettingTab';
import { PostTab } from './PostTab';
import { AnimalTab } from './AnimalTab'; // Import AnimalTab
import { Animal } from '../../types/Animal'; // Import Animal type
import { AdoptionTab } from './AdoptionTab';
import { AdoptionResponse } from '../../types/Adoption';
import { ShelterTab } from './ShelterTab';
import { OrderTab } from './OrderTab';
import { OrderResponse } from '../../types/Order';

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

    // Animal handlers
    const handleViewAnimalDetail = (animal: Animal) => {
        // Navigate to animal detail page or show modal
        console.log('View animal detail:', animal);
    };

    const handleEditAnimal = (animal: Animal) => {
        // Handle animal editing
        console.log('Edit animal:', animal);
    };

    const handleDeleteAnimal = (animalId: string) => {
        // Handle animal deletion
        console.log('Delete animal:', animalId);
    };

    const handleViewAdoptionDetail = (adoption: AdoptionResponse) => {
        console.log('View adoption detail:', adoption);
    };

    const handleAdoptionStatusUpdate = (adoptionId: string, status: 'APPROVE' | 'REJECT') => {
        console.log('Adoption status updated:', adoptionId, status);
    };

    const handleShelterUpdate = async (shelterData: any) => {
        try {
            // Call your API to update shelter information
            console.log('Updating shelter:', shelterData);
            // You can add API call here when available
            // await shelterApi.update(shelterData);

            alert('Shelter information updated successfully!');
        } catch (error) {
            console.error('Failed to update shelter:', error);
            alert('Failed to update shelter information. Please try again.');
        }
    };

    const handleViewOrderDetail = (order: OrderResponse) => {
        console.log('View order detail:', order);
        // You can implement order detail modal here
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return <InformationTab user={user} onInformationUpdate={handleProfileUpdate} />;
            case 'orders': // ✅ Add orders case
                return <OrderTab />;
            case 'settings':
                return <SettingTab onPasswordChange={handlePasswordChange} />;
            case 'shelter':
                return <ShelterTab onShelterUpdate={handleShelterUpdate} />;
            case 'adoptions':
                return <AdoptionTab onViewDetail={handleViewAdoptionDetail} onStatusUpdate={handleAdoptionStatusUpdate} />;
            case 'posts':
                return user.role === 'SHELTER' ? (
                    <PostTab
                        onViewDetail={handleViewPostDetail}
                        onPostUp={handlePostUp}
                        onDeletePost={handleDeletePost}
                    />
                ) : null;
            case 'animals':
                return user.role === 'SHELTER' ? (
                    <AnimalTab
                        onViewDetail={handleViewAnimalDetail}
                        onEditAnimal={handleEditAnimal}
                        onDeleteAnimal={handleDeleteAnimal}
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