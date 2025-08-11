import api from "../../utils/axios.js"
import { unwrapAll } from "../../utils/unwrapper.js"

export const register = (data) => unwrapAll(api.post('/auth/register', data))
export const login = (data) => unwrapAll(api.post('/auth/login', data))
export const logout = () => unwrapAll(api.post('/auth/logout'))
export const refreshToken = () => unwrapAll(api.post('/auth/refresh-token'))
export const sendOtp = (data) => unwrapAll(api.post('/auth/send-otp', data))
export const verifyOtp = (data) => unwrapAll(api.post('/auth/verify-otp', data))
export const resetPassword = (data) => unwrapAll(api.post('/auth/reset-password', data))