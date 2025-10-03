import React, { useState } from 'react';
import { FileText, Tag, Save, Eye, ArrowLeft } from 'lucide-react';
import { Input, Select } from '../../components/ui/input/Input';
import { Button } from '../../components/ui/Button';
import { FormErrors } from '../../types';
import { PostRequest } from '../../types/Post';
import { Post } from '../../types/Post';
import { postApi } from '../../services/api/PostApi';

interface CreatePostFormProps {
  onPostCreated: (post: Post) => void;
  onCancel: () => void;
}

export const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated, onCancel }) => {
    const [formData, setFormData] = useState<PostRequest>({
        topic: '',
        htmlContent: '',
        deltaContent: '',
        categoryId: '',
        thumbnail: '',
    });

    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isPreview, setIsPreview] = useState(false);

    const categories = [
        { value: '1', label: 'Rescue Stories' },
        { value: '2', label: 'Adoption Events' },
        { value: '3', label: 'Volunteer Programs' },
        { value: '4', label: 'Health Tips' },
        { value: '5', label: 'Success Stories' },
    ];

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.topic.trim()) {
            newErrors.topic = 'Topic is required';
        }

        if (!formData.htmlContent.trim()) {
            newErrors.htmlContent = 'Content is required';
        }

        if (!formData.categoryId) {
            newErrors.categoryId = 'Please select a category';
        }

        if (!thumbnailFile && !formData.thumbnail) {
            newErrors.thumbnail = 'Thumbnail image is required';
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
            const postData = {
                ...formData,
                thumbnail: thumbnailPreview || formData.thumbnail,
                deltaContent: JSON.stringify({ ops: [{ insert: formData.htmlContent }] })
            };

            const response = await postApi.createPost(postData);
            console.log('Post created:', response.data);
            
            // Tạo mock post mới để thêm vào danh sách
            const newPost: Post = {
                id: Date.now().toString(), // Mock ID
                topic: formData.topic,
                htmlContent: formData.htmlContent,
                deltaContent: formData.deltaContent,
                categoryBlog: {
                    id: formData.categoryId,
                    name: categories.find(cat => cat.value === formData.categoryId)?.label || 'Unknown'
                },
                thumbnail: thumbnailPreview || formData.thumbnail,
                view: 0,
                stamp: new Date().toISOString(),
                author_id: 'current-shelter-id',
            };

            alert('Post created successfully!');
            onPostCreated(newPost);
        } catch (error) {
            setErrors({ general: 'Failed to create post. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            if (errors.thumbnail) {
                setErrors(prev => ({ ...prev, thumbnail: '' }));
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
                        Back to Posts
                    </Button>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Share your shelter's story and help animals find loving homes
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
                        <h3 className="text-xl font-semibold text-gray-900">Post Preview</h3>

                        {thumbnailPreview && (
                            <div className="aspect-w-16 aspect-h-9">
                                <img
                                    src={thumbnailPreview}
                                    alt="Thumbnail preview"
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                            </div>
                        )}

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">
                                {formData.topic || 'Your post title...'}
                            </h1>
                            <div className="prose max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: formData.htmlContent || '<p>Your post content...</p>' }} />
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
                                Publish Post
                            </Button>
                        </div>
                    </div>
                ) : (
                    // Edit Mode
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Post Title"
                            name="topic"
                            type="text"
                            value={formData.topic}
                            onChange={handleChange}
                            error={errors.topic}
                            icon={<FileText className="h-5 w-5 text-gray-400" />}
                            placeholder="Enter an engaging title for your post..."
                            required
                        />

                        <Select
                            label="Category"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            error={errors.categoryId}
                            options={[
                                { value: '', label: 'Select a category...' },
                                ...categories
                            ]}
                            icon={<Tag className="h-5 w-5 text-gray-400" />}
                        />

                        {/* Thumbnail Upload */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Thumbnail Image
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                                    />
                                </div>
                                {thumbnailPreview && (
                                    <div className="w-20 h-20">
                                        <img
                                            src={thumbnailPreview}
                                            alt="Thumbnail preview"
                                            className="w-full h-full object-cover rounded-lg border border-gray-300"
                                        />
                                    </div>
                                )}
                            </div>
                            {errors.thumbnail && (
                                <p className="text-sm text-red-600">{errors.thumbnail}</p>
                            )}
                        </div>

                        {/* Content Editor */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Post Content
                            </label>
                            <textarea
                                name="htmlContent"
                                value={formData.htmlContent}
                                onChange={handleChange}
                                rows={12}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors resize-none ${
                                    errors.htmlContent ? 'border-red-500' : ''
                                }`}
                                placeholder="Write your post content here. You can use HTML tags for formatting..."
                            />
                            {errors.htmlContent && (
                                <p className="text-sm text-red-600">{errors.htmlContent}</p>
                            )}
                            <p className="text-xs text-gray-500">
                                You can use basic HTML tags like &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;br&gt;, etc.
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
                                Create Post
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};