import React, { useEffect, useState } from 'react';
import { PawPrint, Tag, Save, Eye, ArrowLeft, User, Calendar, X, } from 'lucide-react';
import { Input, Select } from '../../components/ui/input/Input';
import { Button } from '../../components/ui/Button';
import { FormErrors } from '../../types';
import { AnimalRequest } from '../../types/Animal';
import { animalApi } from '../../services/api/AnimalApi';
import { CategoryAnimalResponse } from '../../types/Category';
import { categoryApi } from '../../services/api/CategoryApi';

interface CreateAnimalFormProps {
    onCancel: () => void;
}

export const CreateAnimalForm: React.FC<CreateAnimalFormProps> = ({ onCancel }) => {
    const shelter = localStorage.getItem('shelter') || '';
    const shelterData = shelter ? JSON.parse(shelter) : null;
    const shelterUuid = shelterData ? shelterData.shelterUuid : '';

    const [categories, setCategories] = useState<CategoryAnimalResponse[]>([]);
    const [formData, setFormData] = useState<AnimalRequest>({
        shelterUuid: shelterUuid, // Get from current user/shelter context
        categoryAnimalsUuid: '',
        name: '',
        age: 0,
        breed: '',
        gender: '',
        description: '',
        img_url: '',
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isPreview, setIsPreview] = useState(false);

    const genderOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
    ];

    useEffect(() => {
        setIsLoading(true);
        getCategories();
        setIsLoading(false);
    }, []);

    const getCategories = async () => {
        try {
            const response = await categoryApi.getAllCategoryAnimals();
            setCategories(response.data.listData);
        } catch (error) {
            console.error('Failed to fetch categories', error);
        }
    };


    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Animal name is required';
        }

        if (!formData.breed.trim()) {
            newErrors.breed = 'Breed is required';
        }

        if (!formData.categoryAnimalsUuid) {
            newErrors.categoryAnimalsUuid = 'Please select a category';
        }

        if (!formData.gender) {
            newErrors.gender = 'Please select gender';
        }

        if (formData.age <= 0) {
            newErrors.age = 'Age must be greater than 0';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!imageFile && !formData.img_url.trim()) {
            newErrors.img_url = 'Animal photo is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview('');
        setFormData(prev => ({ ...prev, img_url: '' }));

        // Clear file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }

        // Clear error nếu có
        if (errors.img_url) {
            setErrors(prev => ({ ...prev, img_url: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            console.table(formData);
            const response = await animalApi.create(formData);
            console.log('Animal created:', response.data);
        } catch (error) {
            setErrors({ general: 'Failed to add animal. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value) || 0 : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result as string;
                setImagePreview(reader.result as string);
                setFormData(prev => ({ ...prev, img_url: dataUrl }));
            };
            reader.readAsDataURL(file);
            if (errors.img_url) {
                setErrors(prev => ({ ...prev, img_url: '' }));
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        onClick={onCancel}
                        variant="outline"
                        size="sm"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Animals
                    </Button>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Add New Animal</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Add a new animal to your shelter and help them find a loving home
                        </p>
                    </div>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsPreview(!isPreview)}
                    className="flex items-center"
                >
                    <Eye className="h-4 w-4 mr-2" />
                    {isPreview ? 'Edit Mode' : 'Preview Mode'}
                </Button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                {errors.general && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                        {errors.general}
                    </div>
                )}

                {isPreview ? (
                    // Preview Mode
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900">Animal Preview</h3>

                        {imagePreview && (
                            <div className="relative aspect-w-16 aspect-h-9">
                                <img
                                    src={imagePreview}
                                    alt="Animal preview"
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                                {/* Nút xóa ảnh trong preview mode */}
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200 shadow-lg"
                                    title="Remove image"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    {formData.name || 'Animal Name'}
                                </h1>
                                <div className="space-y-2">
                                    <p><span className="font-medium">Breed:</span> {formData.breed || 'Not specified'}</p>
                                    <p><span className="font-medium">Age:</span> {formData.age || 0} years old</p>
                                    <p><span className="font-medium">Gender:</span> {formData.gender || 'Not specified'}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Description</h3>
                                <p className="text-gray-700">
                                    {formData.description || 'No description provided...'}
                                </p>
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-6 border-t">
                            <Button
                                onClick={() => setIsPreview(false)}
                                variant="outline"
                                className="flex-1"
                            >
                                Back to Edit
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                className="flex-1"
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Add Animal
                            </Button>
                        </div>
                    </div>
                ) : (
                    // Edit Mode
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Animal Name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                icon={<PawPrint className="h-5 w-5 text-gray-400" />}
                                placeholder="e.g., Max, Luna, Charlie..."
                                required
                            />

                            <Input
                                label="Breed"
                                name="breed"
                                type="text"
                                value={formData.breed}
                                onChange={handleChange}
                                error={errors.breed}
                                icon={<Tag className="h-5 w-5 text-gray-400" />}
                                placeholder="e.g., Golden Retriever, Persian Cat..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Select
                                label="Category"
                                name="categoryAnimalsUuid"
                                value={formData.categoryAnimalsUuid}
                                onChange={handleChange}
                                error={errors.categoryAnimalsUuid}
                                options={[
                                    { value: '', label: 'Select category...' },
                                    ...categories.map(cat => ({ value: cat.categoryId, label: cat.categoryName }))
                                ]}
                                icon={<Tag className="h-5 w-5 text-gray-400" />}
                            />

                            <Select
                                label="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                error={errors.gender}
                                options={[
                                    { value: '', label: 'Select gender...' },
                                    ...genderOptions
                                ]}
                                icon={<User className="h-5 w-5 text-gray-400" />}
                            />

                            <Input
                                label="Age (years)"
                                name="age"
                                type="number"
                                value={formData.age.toString()}
                                onChange={handleChange}
                                error={errors.age}
                                icon={<Calendar className="h-5 w-5 text-gray-400" />}
                                placeholder="2"
                                min="0"
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Animal Photo
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                    />
                                </div>
                                {(imagePreview || formData.img_url) && (
                                    <div className="relative inline-block">
                                        <div className="w-32 h-32">
                                            <img
                                                src={imagePreview || formData.img_url}
                                                alt="Animal preview"
                                                className="w-full h-full object-cover rounded-lg border border-gray-300"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=Invalid+Image';
                                                }}
                                            />
                                        </div>
                                        {/* Nút xóa ảnh overlay */}
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200 shadow-lg"
                                            title="Remove image"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            {errors.img_url && (
                                <p className="text-sm text-red-600">{errors.img_url}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none ${errors.description ? 'border-red-500' : ''
                                    }`}
                                placeholder="Describe the animal's personality, behavior, special needs, medical history, etc..."
                            />
                            {errors.description && (
                                <p className="text-sm text-red-600">{errors.description}</p>
                            )}
                            <p className="text-xs text-gray-500">
                                Provide detailed information to help potential adopters understand the animal's needs.
                            </p>
                        </div>

                        <div className="flex space-x-4">
                            <Button
                                type="button"
                                onClick={onCancel}
                                variant="outline"
                                className="flex-1"
                                size="lg"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                size="lg"
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Add Animal
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};