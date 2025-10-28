import { api } from "../../utils/Axios";

export interface CategoryBlog {
  id: string;
  name: string;
}

export interface CategoryBlogRequest {
  name: string;
}

export const categoryBlogApi = {
  // Get all category blogs
  getAllCategoryBlogs: () => {
    return api.get<CategoryBlog[]>('/categoryBlog/get');
  },

  // Get category blog by ID
  getCategoryBlogById: (id: string) => {
    return api.get<CategoryBlog>(`/categoryBlog/get/${id}`);
  },

  // Create new category blog
  createCategoryBlog: (categoryData: CategoryBlogRequest) => {
    return api.post<CategoryBlog>('/categoryBlog', categoryData);
  }
};
