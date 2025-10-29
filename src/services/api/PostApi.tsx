import { PostRequest, PostResponse } from "../../types/Post";
import { DataResponse } from "../../types/DataResponse";
import { api } from "../../utils/Axios";

export const postApi = {
    // Create a new post
    createPost: (post: PostRequest) => {
        return api.post('/post/create', post);
    },

    // Get all posts with pagination
    getAllPosts: (page: number = 0, size: number = 10) => {
        return api.get<DataResponse<PostResponse>>(`/post?page=${page}&size=${size}`);
    },

    // Get post by ID
    getPostById: (postId: string) => {
        return api.get<PostResponse>(`/post/${postId}`);
    },

    // Update post
    updatePost: (postId: string, postData: PostRequest) => {
        return api.put<PostResponse>(`/post/${postId}`, postData);
    },

    // Delete post
    deletePost: (postId: string) => {
        return api.delete(`/post/${postId}`);
    },

    // Filter posts by category
    filterPostsByCategory: (categoryId: string, page: number = 0, size: number = 10) => {
        return api.get<DataResponse<PostResponse>>(`/post/filter/${categoryId}?page=${page}&size=${size}`);
    },

    // Search posts
    searchPosts: (query: string, page: number = 0, size: number = 10) => {
        return api.get<DataResponse<PostResponse>>(`/post/search?query=${query}&page=${page}&size=${size}`);
    },

    // Get posts by author
    getPostsByAuthor: (authorId: string, page: number = 0, size: number = 10) => {
        return api.get<DataResponse<PostResponse>>(`/post/author/${authorId}?page=${page}&size=${size}`);
    },

    // Get popular posts
    getPopularPosts: (limit: number = 10) => {
        return api.get<PostResponse[]>(`/post/popular?limit=${limit}`);
    },

    // Get recent posts
    getRecentPosts: (limit: number = 10) => {
        return api.get<PostResponse[]>(`/post/recent?limit=${limit}`);
    }
}