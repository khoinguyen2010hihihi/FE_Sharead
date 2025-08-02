// api/user.api.js
import api from "../utils/axios";

export const createUser = (data) => api.post('/user/create', data);
export const updateMe = (data) => api.put('/user/updateMe', data);
export const updateAvatar = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  return api.put('/user/updateAvatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const getMe = () => api.get('/user/profile/me');
export const getAllUsers = () => api.get('/user/getAll');
export const searchUsers = (q) => api.get(`/user/search?q=${q}`);
export const getUserProfile = (id) => api.get(`/user/profile/${id}`);
export const getUserById = (id) => api.get(`/user/${id}`);
export const updateUser = (id, data) => api.put(`/user/${id}`, data);
export const deleteUser = (id) => api.delete(`/user/${id}`);