import { PostRequest } from "../../types/Post";
import { api } from "../../utils/Axios";

export const postApi = {
    createPost: (post: PostRequest) => {
        return api.post('/post/create', post);
    }
}