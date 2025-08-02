import api from "../utils/axios";

export const getPosts = () => api.get('/post');
export const createPost = (formData) =>
  api.post('/post', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
export const getPostById = (postId) => api.get(`/post/${postId}`);
export const repostPost = (postId) => api.post(`/post/${postId}/repost`);
