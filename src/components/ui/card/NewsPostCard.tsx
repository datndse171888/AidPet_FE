import React from 'react';
import { Calendar, Eye, Tag, Clock } from 'lucide-react';
import { Post } from '../../../types/Post';

interface NewsPostCardProps {
  post: Post;
  onClick: () => void;
}

export const NewsPostCard: React.FC<NewsPostCardProps> = ({ post, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return formatDate(dateString);
  };

  const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 overflow-hidden">
        <img
          src={post.thumbnail}
          alt={post.topic}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-5">
        {/* Category Badge */}
        <div className="flex items-center mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
            <Tag className="h-3 w-3 mr-1" />
            {post.categoryBlog.name}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {post.topic}
        </h3>

        {/* Content Preview */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {stripHtml(post.htmlContent)}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(post.stamp)}</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              <span>{post.view.toLocaleString()} views</span>
            </div>
          </div>
          <div className="flex items-center text-orange-600">
            <Clock className="h-3 w-3 mr-1" />
            <span>{getTimeAgo(post.stamp)}</span>
          </div>
        </div>

        {/* Read More Indicator */}
        <div className="mt-3 text-right">
          <span className="text-sm text-orange-600 font-medium group-hover:underline">
            Read more →
          </span>
        </div>
      </div>
    </div>
  );
};