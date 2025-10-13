import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Post } from '../../types/Post';
import { AdminPostCard } from '../../components/ui/card/AdminPostCard';
import { PostDetailModal } from '../../components/ui/modal/PostDetailModal';
import { PostApprovalModal } from '../../components/ui/modal/PostApprovalModal';
import { adminPostApi } from '../../services/api/AdminPostApi';

export const PostManager: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');
  const [approvalPostId, setApprovalPostId] = useState<string>('');
  const [approvalLoading, setApprovalLoading] = useState(false);

  // Fetch posts from API with automatic fallback
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // Use API service with automatic fallback to mock data
                const response = await adminPostApi.getAllPosts(0, 100);
                setPosts(response.data.listData || []);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
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

  const handleApprove = (postId: string) => {
    setApprovalAction('approve');
    setApprovalPostId(postId);
    setShowApprovalModal(true);
  };

  const handleReject = (postId: string) => {
    setApprovalAction('reject');
    setApprovalPostId(postId);
    setShowApprovalModal(true);
  };

  const handleApprovalConfirm = async (message: string) => {
    setApprovalLoading(true);
    
    try {
            if (approvalAction === 'approve') {
              await adminPostApi.approvePost(approvalPostId, message);
              setPosts(prev => prev.map(post =>
                post.id === approvalPostId
                  ? { ...post, view: 1 } // Mock approval by setting view > 0
                  : post
              ));
            } else {
              await adminPostApi.rejectPost(approvalPostId, message);
              setPosts(prev => prev.filter(post => post.id !== approvalPostId));
            }
      
      setShowApprovalModal(false);
      setApprovalPostId('');
    } catch (error) {
      console.error(`Failed to ${approvalAction} post:`, error);
      // Handle error - show toast notification
    } finally {
      setApprovalLoading(false);
    }
  };

  const handleCloseApprovalModal = () => {
    setShowApprovalModal(false);
    setApprovalPostId('');
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
                aria-label="Filter posts by status"
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

      {/* Post Approval Modal */}
      <PostApprovalModal
        isOpen={showApprovalModal}
        onClose={handleCloseApprovalModal}
        onConfirm={handleApprovalConfirm}
        action={approvalAction}
        postTitle={posts.find(p => p.id === approvalPostId)?.topic || ''}
        isLoading={approvalLoading}
      />
    </div>
  );
};