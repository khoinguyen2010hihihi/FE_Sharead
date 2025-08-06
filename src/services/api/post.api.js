import api from "../../utils/axios.js"
import { unwrap } from "../../utils/unwrapper.js"

export const getPosts = () => unwrap(api.get('/post'))
export const createPost = (formData) =>
  unwrap(api.post('/post', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }))
export const getPostById = (postId) => unwrap(api.get(`/post/${postId}`))
export const repostPost = (postId) => unwrap(api.post(`/post/${postId}/repost`))
