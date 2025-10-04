import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Post } from '../../types/Post';
import { AdminPostCard } from '../../components/ui/card/AdminPostCard';
import { PostDetailModal } from '../../components/ui/modal/PostDetailModal';

export const PostManager: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    setIsLoading(true);

    // Simulate API call
    // const response = await postApi.getAllPosts();
    // setPosts(response.data);

    const mockPosts: Post[] = [
      {
        id: '1',
        topic: 'Help Us Save Abandoned Puppies - Urgent Medical Care Needed',
        htmlContent: '<p>We recently rescued several abandoned puppies who need urgent medical care and loving homes. These adorable little ones were found in poor condition but are now receiving the care they need at our shelter.</p>',
        deltaContent: '{"ops":[{"insert":"We recently rescued several abandoned puppies..."}]}',
        categoryBlog: { id: '1', name: 'Rescue Stories' },
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
        categoryBlog: { id: '2', name: 'Adoption Events' },
        thumbnail: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400',
        view: 189,
        stamp: '2024-01-10T14:30:00Z',
        author_id: 'shelter456',
      },
      {
        id: '3',
        topic: 'New Volunteer Training Program Starting Next Month',
        htmlContent: '<p>We are starting a new volunteer training program next month. Learn how to properly care for animals and help us make a difference in their lives.</p>',
        deltaContent: '{"ops":[{"insert":"We are starting a new volunteer training program..."}]}',
        categoryBlog: { id: '3', name: 'Volunteer Programs' },
        thumbnail: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400',
        view: 0, // Pending approval
        stamp: '2024-01-08T09:15:00Z',
        author_id: 'shelter789',
      },
      {
        id: '4',
        topic: 'Pet Health Tips for Winter Season',
        htmlContent: '<p>Winter is coming and it\'s important to keep your pets healthy during the cold season. Here are some essential tips to help your furry friends stay warm and comfortable.</p>',
        deltaContent: '{"ops":[{"insert":"Winter is coming and it\'s important to keep your pets healthy..."}]}',
        categoryBlog: { id: '4', name: 'Health Tips' },
        thumbnail: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=400',
        view: 0, // Pending approval
        stamp: '2024-01-05T16:45:00Z',
        author_id: 'shelter123',
      },
      {
        id: '5',
        topic: 'Success Story: Max Finds His Forever Home',
        htmlContent: '<p>We are thrilled to share the heartwarming story of Max, a German Shepherd who found his perfect family after months of waiting. This is what makes our work so rewarding!</p>',
        deltaContent: '{"ops":[{"insert":"We are thrilled to share the heartwarming story of Max..."}]}',
        categoryBlog: { id: '5', name: 'Success Stories' },
        thumbnail: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=400',
        view: 428,
        stamp: '2024-01-03T11:20:00Z',
        author_id: 'shelter456',
      }
    ];

    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.categoryBlog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author_id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'approved' && post.view > 0) ||
      (statusFilter === 'pending' && post.view === 0);

    return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (post: Post) => {
    setSelectedPost(post);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedPost(null);
  };

  const handleApprove = async (postId: string) => {
    if (window.confirm('Are you sure you want to approve this post?')) {
      // Simulate API call
      // await postApi.approvePost(postId);

      setPosts(prev => prev.map(post =>
        post.id === postId
          ? { ...post, view: 1 } // Mock approval by setting view > 0
          : post
      ));

      console.log('Approved post:', postId);
    }
  };

  const handleReject = async (postId: string) => {
    if (window.confirm('Are you sure you want to reject this post? This action cannot be undone.')) {
      // Simulate API call
      // await postApi.rejectPost(postId);

      setPosts(prev => prev.filter(post => post.id !== postId));

      console.log('Rejected post:', postId);
    }
  };

  const stats = {
    total: posts.length,
    approved: posts.filter(p => p.view > 0).length,
    pending: posts.filter(p => p.view === 0).length,
    totalViews: posts.reduce((sum, post) => sum + post.view, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Post Management</h1>
          <p className="text-gray-600 mt-1">
            Review and manage all posts from shelters across the platform
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
              <p className="text-sm text-gray-600">Total Posts</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-green-600">{stats.approved}</h3>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-yellow-600">{stats.pending}</h3>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-purple-600">{stats.totalViews.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Total Views</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by title, category, or author ID..."
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
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'approved' | 'pending')}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending Review</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-gray-600">Loading posts...</span>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <AdminPostCard
              key={post.id}
              post={post}
              onViewDetail={handleViewDetail}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="text-gray-500 text-lg mb-2">
            {searchQuery || statusFilter !== 'all'
              ? 'No posts found matching your criteria'
              : 'No posts available'
            }
          </div>
          <p className="text-gray-400">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filter settings'
              : 'Posts from shelters will appear here for review'
            }
          </p>
        </div>
      )}

      {/* Post Detail Modal */}
      <PostDetailModal
        isOpen={showDetailModal}
        post={selectedPost}
        onClose={handleCloseModal}
        onApprove={handleApprove}
        onReject={handleReject}
        showActions={true}
      />
    </div>
  );
};