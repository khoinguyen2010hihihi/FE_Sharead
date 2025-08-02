import api from "../utils/axios"

export const register = (data) => api.post('/register', data)
export const login = (data) => api.post('/login', data)
export const logout = () => api.post('/logout')
export const refreshToken = () => api.post('/refresh-token')
export const sendOtp = (data) => api.post('/send-otp', data)
export const verifyOtp = (data) => api.post('/verify-otp', data)
export const resetPassword = (data) => api.post('/reset-password', data)