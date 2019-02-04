import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('USER_TOK')
  const configuration = config

  if (token) {
    configuration.headers.Authorization = `Bearer ${token}`
  }

  return configuration
}, (error) => {
  throw error
})

export default axiosInstance
