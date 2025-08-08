import api from "../../utils/axios.js"
import { unwrap } from "../../utils/unwrapper.js"

export const toggleCommentLike = commentId => unwrap(api.post(`/comment-like/${commentId}`))