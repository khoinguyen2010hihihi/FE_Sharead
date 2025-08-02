import api from "../utils/axios";

export const sendFriendRequest = receiverId => api.post(`/friend/send/${receiverId}`)
export const acceptFriendRequest = requestId => api.post(`/friend/accept/${requestId}`)
export const rejectFriendRequest = requestId => api.post(`/friend/reject/${requestId}`)
export const cancelFriendRequest = requestId => api.delete(`/friend/cancel/${requestId}`)
export const unfriend = friendId => api.delete(`/friend/unfriend/${friendId}`)
export const getReceiverRequests = () => api.get('/friend/receiver')
export const getSenderRequests = () => api.get('/friend/sender')
export const getFriends = () => api.get('/friend/friends')