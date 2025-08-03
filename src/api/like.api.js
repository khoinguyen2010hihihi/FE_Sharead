import api from "../utils/axios"
import { unwrap } from "../utils/unwrapper.js"

export const toggleLike = postId => unwrap(api.post(`/like/${postId}`))
export const getPostLikes = postId => unwrap(api.get(`/like/${postId}`))