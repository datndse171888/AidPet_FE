import React, { useEffect, useState } from 'react';
import { X, Edit, Save, Calendar, Tag, User, Heart, MapPin, Info } from 'lucide-react';
import { AnimalRequest, AnimalResponse } from '../../../types/Animal';
import { Button } from '../Button';
import { Input, Select } from '../input/Input';
import { FormErrors } from '../../../types';

interface AnimalDetailModalProps {
    isOpen: boolean;
    animal: AnimalResponse | null;
    onClose: () => void;
    onSave: (animalData: AnimalRequest) => void;
    showActions?: boolean;
}

export const AnimalDetailModal: React.FC<AnimalDetailModalProps> = ({
    isOpen,
    animal,
    onClose,
    onSave,
    showActions = true
}) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    
    const [editData, setEditData] = useState<AnimalRequest>({
        shelterUuid: 'current-shelter-uuid',
        categoryAnimalsUuid: '',
        name: '',
        age: 0,
        breed: '',
        gender: '',
        description: '',
        img_url: ''
    });

    const categories = [
        { value: '1', label: 'Dogs' },
        { value: '2', label: 'Cats' },
        { value: '3', label: 'Birds' },
        { value: '4', label: 'Rabbits' },
        { value: '5', label: 'Other Pets' },
    ];

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
    ];

    const statusOptions = [
        { value: 'AVAILABLE', label: 'Available for Adoption' },
        { value: 'PENDING', label: 'Pending Adoption' },
        { value: 'RESCUED', label: 'Recently Rescued' },
        { value: 'ADOPTED', label: 'Already Adopted' },
    ];

    // Initialize edit data when animal changes
    useEffect(() => {
        if (animal) {
            setEditData({
                shelterUuid: animal.shelter?.shelterUuid || 'current-shelter-uuid',
                categoryAnimalsUuid: animal.categoryAnimals.animalCateUuid || '',
                name: animal.name,
                age: animal.age,
                breed: animal.breed,
                gender: animal.gender,
                description: animal.description,
                img_url: animal.imgUrl
            });
        }
    }, [animal]);

    // Handle ESC key press
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            // Restore body scroll when modal is closed
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const getStatusBadge = () => {
        if (!animal) return '';
        switch (animal.status) {
            case 'AVAILABLE':
                return 'bg-green-100 text-green-800';
            case 'ADOPTED':
                return 'bg-blue-100 text-blue-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'RESCUED':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!editData.name.trim()) {
            newErrors.name = 'Animal name is required';
        }

        if (!editData.breed.trim()) {
            newErrors.breed = 'Breed is required';
        }

        if (!editData.categoryAnimalsUuid) {
            newErrors.categoryAnimalsUuid = 'Please select a category';
        }

        if (!editData.gender) {
            newErrors.gender = 'Please select gender';
        }

        if (editData.age <= 0) {
            newErrors.age = 'Age must be greater than 0';
        }

        if (!editData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!editData.img_url.trim()) {
            newErrors.img_url = 'Animal photo URL is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditData(prev => ({ 
            ...prev, 
            [name]: name === 'age' ? parseInt(value) || 0 : value 
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSave = async () => {
        if (!validate()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            await onSave(editData);
            setIsEditMode(false);
        } catch (error) {
            setErrors({ general: 'Failed to update animal. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        if (animal) {
            // Reset to original data
            setEditData({
                shelterUuid: animal.shelter?.shelterUuid || 'current-shelter-uuid',
                categoryAnimalsUuid: animal.categoryAnimals.animalCateUuid || '',
                name: animal.name,
                age: animal.age,
                breed: animal.breed,
                gender: animal.gender,
                description: animal.description,
                img_url: animal.imgUrl
            });
        }
        setIsEditMode(false);
        setErrors({});
    };

    if (!isOpen || !animal) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 z-40 backdrop-blur-sm"
                style={{
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                }}
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden pointer-events-auto">
                    {/* Modal Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge()}`}>
                                    {animal.status}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {isEditMode ? 'Edit Animal' : 'Animal Details'}
                                </h3>
                            </div>
                            <div className="flex items-center space-x-2">
                                {showActions && !isEditMode && (
                                    <Button
                                        onClick={() => setIsEditMode(true)}
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                                >
                                    <X className="h-6 w-6 text-gray-400 group-hover:text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Modal Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(95vh-140px)]">
                        {errors.general && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                                {errors.general}
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - Image and Basic Info */}
                            <div className="space-y-6">
                                {/* Animal Image */}
                                <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-xl overflow-hidden">
                                    <img
                                        src={isEditMode ? editData.img_url : animal.imgUrl}
                                        alt={isEditMode ? editData.name : animal.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                                        }}
                                    />
                                </div>

                                {isEditMode && (
                                    <Input
                                        label="Photo URL"
                                        name="img_url"
                                        type="url"
                                        value={editData.img_url}
                                        onChange={handleChange}
                                        error={errors.img_url}
                                        placeholder="https://example.com/animal-photo.jpg"
                                        required
                                    />
                                )}

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                                        <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                                        <div className="text-sm font-medium text-gray-500">Age</div>
                                        <div className="text-xl font-bold text-orange-600">
                                            {isEditMode ? editData.age : animal.age} years
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                                        <User className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                        <div className="text-sm font-medium text-gray-500">Gender</div>
                                        <div className="text-xl font-bold text-blue-600">
                                            {isEditMode ? editData.gender : animal.gender}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Details */}
                            <div className="space-y-6">
                                {isEditMode ? (
                                    /* Edit Form */
                                    <div className="space-y-4">
                                        <Input
                                            label="Animal Name"
                                            name="name"
                                            type="text"
                                            value={editData.name}
                                            onChange={handleChange}
                                            error={errors.name}
                                            icon={<Heart className="h-5 w-5 text-gray-400" />}
                                            required
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                label="Breed"
                                                name="breed"
                                                type="text"
                                                value={editData.breed}
                                                onChange={handleChange}
                                                error={errors.breed}
                                                icon={<Tag className="h-5 w-5 text-gray-400" />}
                                                required
                                            />

                                            <Input
                                                label="Age (years)"
                                                name="age"
                                                type="number"
                                                value={editData.age.toString()}
                                                onChange={handleChange}
                                                error={errors.age}
                                                icon={<Calendar className="h-5 w-5 text-gray-400" />}
                                                min="0"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <Select
                                                label="Category"
                                                name="categoryAnimalsUuid"
                                                value={editData.categoryAnimalsUuid}
                                                onChange={handleChange}
                                                error={errors.categoryAnimalsUuid}
                                                options={[
                                                    { value: '', label: 'Select category...' },
                                                    ...categories
                                                ]}
                                                icon={<Tag className="h-5 w-5 text-gray-400" />}
                                            />

                                            <Select
                                                label="Gender"
                                                name="gender"
                                                value={editData.gender}
                                                onChange={handleChange}
                                                error={errors.gender}
                                                options={[
                                                    { value: '', label: 'Select gender...' },
                                                    ...genderOptions
                                                ]}
                                                icon={<User className="h-5 w-5 text-gray-400" />}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={editData.description}
                                                onChange={handleChange}
                                                rows={6}
                                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none ${
                                                    errors.description ? 'border-red-500' : ''
                                                }`}
                                                placeholder="Describe the animal's personality, behavior, special needs, etc..."
                                            />
                                            {errors.description && (
                                                <p className="text-sm text-red-600">{errors.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    /* View Mode */
                                    <div className="space-y-6">
                                        {/* Animal Name */}
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                                {animal.name}
                                            </h1>
                                            <p className="text-lg text-gray-600">{animal.breed}</p>
                                        </div>

                                        {/* Basic Info Grid */}
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <div className="flex items-center mb-2">
                                                    <Tag className="h-5 w-5 text-gray-400 mr-2" />
                                                    <span className="text-sm font-medium text-gray-500">Category</span>
                                                </div>
                                                <div className="text-lg font-semibold text-gray-900">
                                                    {animal.categoryAnimals.categoryName || 'Unknown'}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center mb-2">
                                                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                                                    <span className="text-sm font-medium text-gray-500">Shelter</span>
                                                </div>
                                                <div className="text-lg font-semibold text-gray-900">
                                                    {animal.shelter?.shelterName || 'Current Shelter'}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">About {animal.name}</h3>
                                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                    {animal.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {isEditMode && (
                            <div className="flex space-x-4 pt-6 border-t mt-8">
                                <Button
                                    onClick={handleCancel}
                                    variant="outline"
                                    className="flex-1"
                                    size="lg"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    size="lg"
                                    loading={isLoading}
                                    disabled={isLoading}
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};