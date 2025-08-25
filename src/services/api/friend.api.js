import api from "../../utils/axios.js"
import { unwrap } from "../../utils/unwrapper.js"

export const sendFriendRequest = receiverId => unwrap(api.post(`/friend/send/${receiverId}`))
export const acceptFriendRequest = requestId => unwrap(api.post(`/friend/accept/${requestId}`))
export const rejectFriendRequest = requestId => unwrap(api.post(`/friend/reject/${requestId}`))
export const cancelFriendRequest = requestId => unwrap(api.delete(`/friend/cancel/${requestId}`))
export const unfriend = friendId => unwrap(api.delete(`/friend/unfriend/${friendId}`))
export const getReceiverRequests = () => unwrap(api.get('/friend/receiver'))
export const getSenderRequests = () => unwrap(api.get('/friend/sender'))
export const getFriends = () => unwrap(api.get('/friend/friends'))
export const getFriendRequestStatus = otherUserId => unwrap(api.get(`/friend/status/${otherUserId}`))