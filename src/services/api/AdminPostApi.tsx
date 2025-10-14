import { Post } from "../../types/Post";
import { DataResponse } from "../../types/DataResponse";
import { api } from "../../utils/Axios";

// Post management request types
export interface PostApprovalRequest {
  postId: string;
  action: 'approve' | 'reject';
  message?: string;
}

export interface PostFilterRequest {
  status?: 'all' | 'approved' | 'pending' | 'rejected';
  categoryId?: string;
  authorId?: string;
  dateFrom?: string;
  dateTo?: string;
  page: number;
  size: number;
}

export interface PostStats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  totalViews: number;
}

// Admin Post API methods
export const adminPostApi = {
  // Get all posts with pagination and filtering
  getAllPosts: (page: number = 0, size: number = 10) => {
    // Use admin endpoint that returns paging metadata compatible with PostManager
    return api.get<DataResponse<Post>>(`/admin/posts?page=${page}&size=${size}`);
  },

  // Get posts with filters
  getPostsWithFilters: (filters: PostFilterRequest) => {
    return api.post<DataResponse<Post>>('/admin/posts/filter', filters);
  },

  // Get post by ID
  getPostById: (postId: string) => {
    return api.get<Post>(`/post/${postId}`);
  },

  // Approve a post
  approvePost: (postId: string, message?: string) => {
    return api.put<Post>(`/admin/posts/${postId}/approve`, {
      message: message || 'Post approved by admin'
    });
  },

  // Reject a post
  rejectPost: (postId: string, message?: string) => {
    return api.put<Post>(`/admin/posts/${postId}/reject`, {
      message: message || 'Post rejected by admin'
    });
  },

  // Bulk approve posts
  bulkApprovePosts: (postIds: string[], message?: string) => {
    return api.put<{ success: number; failed: number }>('/admin/posts/bulk-approve', {
      postIds,
      message: message || 'Posts approved by admin'
    });
  },

  // Bulk reject posts
  bulkRejectPosts: (postIds: string[], message?: string) => {
    return api.put<{ success: number; failed: number }>('/admin/posts/bulk-reject', {
      postIds,
      message: message || 'Posts rejected by admin'
    });
  },

  // Delete a post
  deletePost: (postId: string) => {
    return api.delete(`/post/${postId}`);
  },

  // Get post statistics
  getPostStats: () => {
    return api.get<PostStats>('/admin/posts/stats');
  },

  // Search posts
  searchPosts: (query: string, page: number = 0, size: number = 10) => {
    return api.get<DataResponse<Post>>(`/admin/posts/search?query=${query}&page=${page}&size=${size}`);
  },

  // Get posts by category
  getPostsByCategory: (categoryId: string, page: number = 0, size: number = 10) => {
    return api.get<DataResponse<Post>>(`/post/filter/${categoryId}?page=${page}&size=${size}`);
  },

  // Update post status
  updatePostStatus: (postId: string, status: 'approved' | 'pending' | 'rejected', message?: string) => {
    return api.put<Post>(`/admin/posts/${postId}/status`, {
      status,
      message: message || `Post status updated to ${status}`
    });
  }
};
