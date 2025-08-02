import api from "../utils/axios";

export const toggleLike = postId => api.post(`/like/${postId}`)
export const getPostLikes = postId => api.get(`/like/${postId}`)