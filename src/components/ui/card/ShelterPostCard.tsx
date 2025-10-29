import React from 'react';
import { Eye, Upload, Trash2, Calendar, Tag } from 'lucide-react';
import { Button } from '../Button';
import { Post, PostRequest } from '../../../types/Post';

interface ShelterPostCardProps {
  post: Post;
  postRequest?: PostRequest;
  onViewDetail: (post: PostRequest) => void;
  onPostUp: (post: PostRequest) => void;
  onDelete: (postId: string) => void;
}

export const ShelterPostCard: React.FC<ShelterPostCardProps> = ({
  post,
  postRequest,
  onViewDetail,
  onPostUp,
  onDelete
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800'
    };
    
    return statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        <img
          src={post.thumbnail}
          alt={post.topic}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
            {post.topic}
          </h3>
          {/* <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(post.status)}`}>
            {post.status}
          </span> */}
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(post.stamp)}</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            <span>{post.view} views</span>
          </div>
        </div>

        <div className="flex items-center mb-3">
          <Tag className="h-4 w-4 text-gray-400 mr-1" />
          <span className="text-sm text-gray-600">Category: {post.categoryBlog.name}</span>
        </div>

        <div 
          className="text-sm text-gray-700 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ 
            __html: post.htmlContent.length > 150 
              ? `${post.htmlContent.substring(0, 150)}...` 
              : post.htmlContent 
          }}
        />

        <div className="flex space-x-2">
          <Button
            onClick={() => onViewDetail(postRequest!)}
            variant="outline"
            size="sm"
            className="flex-1 flex items-center justify-center"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Detail
          </Button>
          
          <Button
            onClick={() => onPostUp(postRequest!)}
            size="sm"
            className="flex-1 flex items-center justify-center"
          >
            <Upload className="h-4 w-4 mr-1" />
            Post Up
          </Button>
          
          <Button
            onClick={() => onDelete(post.id)}
            variant="outline"
            size="sm"
            className="text-red-600 hover:bg-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};