import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:2010',
  withCredentials: true
})

export default api