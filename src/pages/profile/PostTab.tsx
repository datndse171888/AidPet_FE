import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { ShelterPostCard } from '../../components/ui/card/ShelterPostCard';
import { Post, PostRequest } from '../../types/Post';
import { CreatePostForm } from '../shelter/CreatePostForm';

interface PostTabProps {
  onViewDetail?: (post: PostRequest) => void;
  onPostUp?: (post: PostRequest) => void;
  onDeletePost?: (postId: string) => void;
}

export const PostTab: React.FC<PostTabProps> = ({
  onViewDetail,
  onPostUp,
  onDeletePost
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false); // Thêm state này

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: '1',
        topic: 'Help Us Save Abandoned Puppies',
        htmlContent: '<p>We recently rescued several abandoned puppies who need urgent medical care and loving homes. These adorable little ones were found in poor condition but are now receiving the care they need.</p>',
        deltaContent: '{"ops":[{"insert":"We recently rescued several abandoned puppies..."}]}',
        categoryBlog:{
            id: '1', name: 'rescue' 
        },
        thumbnail: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
        view: 245,
        stamp: '2024-01-15T10:00:00Z',
        author_id: 'shelter123',
      },
      {
        id: '2',
        topic: 'Cat Adoption Event This Weekend',
        htmlContent: '<p>Join us this weekend for our special cat adoption event! We have many beautiful cats looking for their forever homes. All cats are vaccinated and spayed/neutered.</p>',
        deltaContent: '{"ops":[{"insert":"Join us this weekend for our special cat adoption event..."}]}',
        categoryBlog:{
            id: '1', name: 'events' 
        },
        thumbnail: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400',
        stamp: '2024-01-10T14:30:00Z',
        view: 189,
        author_id: 'shelter123',
      },
      {
        id: '3',
        topic: 'Volunteer Training Program',
        htmlContent: '<p>We are starting a new volunteer training program next month. Learn how to properly care for animals and help us make a difference in their lives.</p>',
        deltaContent: '{"ops":[{"insert":"We are starting a new volunteer training program..."}]}',
        categoryBlog:{
            id: '1', name: 'volunteer'
        },
        thumbnail: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400',
        stamp: '2024-01-08T09:15:00Z',
        view: 0,
        author_id: 'shelter123',
      }
    ];
    setPosts(mockPosts);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.topic.toLowerCase().includes(searchQuery.toLowerCase());
    // const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch;
    // return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (post: PostRequest) => {
    console.log('View detail for post:', post);
    if (onViewDetail) {
      onViewDetail(post);
    }
  };

  const handlePostUp = (post: PostRequest) => {
    console.log('Post up:', post);
    if (onPostUp) {
      onPostUp(post);
    }
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
      if (onDeletePost) {
        onDeletePost(postId);
      }
    }
  };

  const handleCreatePost = () => {
    setShowCreateForm(true); // Thay đổi từ navigationService.goTo('/post')
  };

  const handlePostCreated = (newPost: Post) => {
    // Thêm post mới vào danh sách
    setPosts(prev => [newPost, ...prev]);
    setShowCreateForm(false);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  // Nếu đang ở chế độ tạo post, hiển thị form tạo post
  if (showCreateForm) {
    return (
      <CreatePostForm
        onPostCreated={handlePostCreated}
        onCancel={handleCancelCreate}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Manage Posts</h2>
          <p className="text-sm text-gray-600 mt-1">
            Create and manage your shelter's posts to help animals find homes
          </p>
        </div>
        <Button
          onClick={handleCreatePost}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Post
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search posts by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
          <div className="text-sm text-gray-600">Total Posts</div>
        </div>
        {/* <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {posts.filter(p => p.status === 'published').length}
          </div>
          <div className="text-sm text-gray-600">Published</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">
            {posts.filter(p => p.status === 'draft').length}
          </div>
          <div className="text-sm text-gray-600">Drafts</div>
        </div> */}
      </div>

      {/* Posts Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <ShelterPostCard
              key={post.id}
              post={post}
              onViewDetail={handleViewDetail}
              onPostUp={handlePostUp}
              onDelete={handleDeletePost}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {searchQuery || statusFilter !== 'all' 
              ? 'No posts found matching your criteria' 
              : 'No posts yet'
            }
          </div>
          <Button onClick={handleCreatePost} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Post
          </Button>
        </div>
      )}
    </div>
  );
};