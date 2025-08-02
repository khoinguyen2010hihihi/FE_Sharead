import api from "../utils/axios";

export const toggleLike = commentId => api.post(`/comment-like/${commentId}`)