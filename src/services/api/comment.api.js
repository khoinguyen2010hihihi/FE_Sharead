import api from "../utils/axios"
import { unwrap } from "../utils/unwrapper.js"

export const createComment = (postId, content) => unwrap(api.post(`/comment/${postId}`, {content}))
export const getCommentsByPost = (postId) => unwrap(api.get(`/comment/${postId}`))
export const deleteComment = (commentId) => unwrap(api.delete(`/comment/${commentId}`))
export const updateComment = (commentId, content) => unwrap(api.put(`/comment/${commentId}`, {content}))