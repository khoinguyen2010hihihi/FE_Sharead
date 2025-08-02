import api from "../utils/axios"

export const createComment = (postId, content) => api.post(`/comment/${postId}`, {content})
export const getCommentsByPost = (postId) => api.get(`/comment/${postId}`)
export const deleteComment = (commentId) => api.delete(`/comment/${commentId}`)
export const updateComment = (commentId, content) => api.put(`/comment/${commentId}`, {content})