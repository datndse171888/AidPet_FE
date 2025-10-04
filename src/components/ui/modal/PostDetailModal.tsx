import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Post } from '../../../types/Post';
import { Button } from '../Button';

interface PostDetailModalProps {
    isOpen: boolean;
    post: Post | null;
    onClose: () => void;
    onApprove?: (postId: string) => void;
    onReject?: (postId: string) => void;
    showActions?: boolean; // Control whether to show approve/reject buttons
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
    isOpen,
    post,
    onClose,
    onApprove,
    onReject,
    showActions = true
}) => {
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

    // Don't render if modal is not open or no post is selected
    if (!isOpen || !post) {
        return null;
    }

    const isPendingPost = post.view === 0;
    const shouldShowActions = showActions && isPendingPost && onApprove && onReject;

    return (
        <>
            {/* Backdrop Overlay with Blur Effect */}
            <div
                className="fixed inset-0 z-40 backdrop-blur-sm"
                style={{
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                }}
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden pointer-events-auto transform transition-all duration-300 ease-out"
                    style={{
                        animation: 'modalSlideIn 0.3s ease-out forwards'
                    }}
                >
                    {/* Modal Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${post.view > 0
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {post.view > 0 ? 'Approved' : 'Pending Review'}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Post Details</h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                            >
                                <X className="h-6 w-6 text-gray-400 group-hover:text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Modal Content */}
                    <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
                        <div className="p-6 space-y-6">
                            {/* Full-size Poster Image */}
                            <div className="w-full">
                                <img
                                    src={post.thumbnail}
                                    alt={post.topic}
                                    className="w-full max-h-96 object-cover rounded-xl shadow-lg"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>

                            {/* Post Title */}
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                    {post.topic}
                                </h1>
                            </div>

                            {/* Post Meta Information */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="text-center">
                                    <div className="text-sm font-medium text-gray-500">Category</div>
                                    <div className="text-lg font-semibold text-gray-900">{post.categoryBlog.name}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-medium text-gray-500">Author</div>
                                    <div className="text-lg font-semibold text-gray-900">{post.author_id}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-medium text-gray-500">Published</div>
                                    <div className="text-lg font-semibold text-gray-900">
                                        {new Date(post.stamp).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-medium text-gray-500">Views</div>
                                    <div className="text-lg font-semibold text-purple-600">{post.view.toLocaleString()}</div>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content</h3>
                                <div
                                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Modal Actions - Only show for pending posts if actions are enabled */}
                    {shouldShowActions && (
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                            <div className="flex space-x-4">
                                <Button
                                    onClick={() => {
                                        onApprove!(post.id);
                                        onClose();
                                    }}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                                >
                                    <Check className="h-4 w-4 mr-2" />
                                    Approve Post
                                </Button>
                                <Button
                                    onClick={() => {
                                        onReject!(post.id);
                                        onClose();
                                    }}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Reject Post
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};