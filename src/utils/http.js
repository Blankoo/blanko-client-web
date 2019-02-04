import axios from 'axios'
const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(config => {
	const token = localStorage.getItem('USER_TOK')

	if(token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config;
}, error => {
	throw error
})

export default axiosInstance
