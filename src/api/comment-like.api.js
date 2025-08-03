import api from "../utils/axios"
import { unwrap } from "../utils/unwrapper.js"

export const toggleCommentLike = commentId => unwrap(api.post(`/comment-like/${commentId}`))