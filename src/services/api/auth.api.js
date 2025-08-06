import api from "../../utils/axios.js"
import { unwrapAll } from "../../utils/unwrapper.js"

export const register = (data) => unwrapAll(api.post('/register', data))
export const login = (data) => unwrapAll(api.post('/login', data))
export const logout = () => unwrapAll(api.post('/logout'))
export const refreshToken = () => unwrapAll(api.post('/refresh-token'))
export const sendOtp = (data) => unwrapAll(api.post('/send-otp', data))
export const verifyOtp = (data) => unwrapAll(api.post('/verify-otp', data))
export const resetPassword = (data) => unwrapAll(api.post('/reset-password', data))