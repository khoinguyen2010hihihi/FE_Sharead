import api from "../utils/axios"

export const getPosts = () => api.get('/post')
export const postPosts = () => api.post('post')
export const getPostById = (postId) => api.get(`post/${postId}`)
export const repostPost = (postId) => api.post(`post/${postId}/repost`)