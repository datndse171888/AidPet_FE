export interface PostRequest {
    topic: string;
    htmlContent: string;
    deltaContent: string;
    categoryId: string;
    thumbnail: string;
}

export interface Post{
    id: string;
    topic: string;
    htmlContent: string;
    deltaContent: string;
    stamp: string;
    view: number;
    thumbnail: string;
    author_id: string;
    categoryBlog: CategoryBlog;
}

export interface CategoryBlog {
    id: string;
    name: string;
}