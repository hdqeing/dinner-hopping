import axios from 'axios'

const request = axios.create({
	baseURL: '/api/', 
	timeout: 5000, 
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'token': 'your token',
		'X-Requested-With': 'XMLHttpRequest',
	},
})

request.interceptors.request.use(
	function (config) {
		return config
	},
	function (error) {
		console.log(error)
		return Promise.reject(error)
	}
)

request.interceptors.response.use(
	function (response) {
		console.log(response)
		const dataAxios = response.data
		// 这个状态码是和后端约定的
		const code = dataAxios.reset
		return dataAxios
	},
	function (error) {
		console.log(error)
		return Promise.reject(error)
	}
)
export default request