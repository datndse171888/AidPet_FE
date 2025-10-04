import React from 'react';
import { Eye, Check, X, Calendar, Tag, User, TrendingUp } from 'lucide-react';
import { Button } from '../Button';
import { Post } from '../../../types/Post';

interface AdminPostCardProps {
  post: Post;
  onViewDetail: (post: Post) => void;
  onApprove: (postId: string) => void;
  onReject: (postId: string) => void;
}

export const AdminPostCard: React.FC<AdminPostCardProps> = ({
  post,
  onViewDetail,
  onApprove,
  onReject
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = () => {
    // Assume posts with view > 0 are approved, others are pending
    const isApproved = post.view > 0;
    return isApproved 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = () => {
    return post.view > 0 ? 'Approved' : 'Pending';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col h-full">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex-shrink-0">
        <img
          src={post.thumbnail}
          alt={post.topic}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
            {post.topic}
          </h3>
          <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge()}`}>
            {getStatusText()}
          </span>
        </div>

        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(post.stamp)}</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>{post.view} views</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{post.categoryBlog.name}</span>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>ID: {post.author_id}</span>
            </div>
          </div>
        </div>

        {/* Buttons container - always at bottom */}
        <div className="flex space-x-2 mt-auto">
          <Button
            onClick={() => onViewDetail(post)}
            variant="outline"
            size="sm"
            className="flex-1 flex items-center justify-center"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Detail
          </Button>
          
          {post.view === 0 && (
            <>
              <Button
                onClick={() => onApprove(post.id)}
                size="sm"
                className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="h-4 w-4" />
                Approve
              </Button>
              
              <Button
                onClick={() => onReject(post.id)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:bg-red-500 border-red-300"
              >
                <X className="h-4 w-4" />
                Reject
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};