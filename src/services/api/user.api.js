import api from "../../utils/axios.js"
import { unwrap } from "../../utils/unwrapper.js"

export const createUser = (data) => unwrap(api.post('/user/create', data))
export const updateMe = (data) => unwrap(api.put('/user/updateMe', data))
export const updateAvatar = (file) => {
  const formData = new FormData()
  formData.append("avatar", file)
  return unwrap(api.put('/user/updateAvatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }))
}
export const getMe = () => unwrap(api.get('/user/profile/me'))
export const getAllUsers = () => unwrap(api.get('/user/getAll'))
export const searchUsers = (q) => unwrap(api.get(`/user/search?q=${q}`))
export const getUserById = (id) => unwrap(api.get(`/user/${id}`))
export const updateUser = (id, data) => unwrap(api.put(`/user/${id}`, data))
export const deleteUser = (id) => unwrap(api.delete(`/user/${id}`))