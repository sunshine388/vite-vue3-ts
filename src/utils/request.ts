import axios from 'axios'

export const baseURL = 'http://127.0.0.1:8080'
const request = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 5000
})

// 请求拦截
request.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers = {
      ...config.headers,
      token
    }
  }
  return config
})

// 响应拦截
request.interceptors.response.use(
  (res) => {
    console.log(res)
    return res.data
  },
  (error) => {
    // 全局错误提示
    return Promise.reject(error)
  }
)

export default request
