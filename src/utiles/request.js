import axios from 'axios';
import { ElMessage } from 'element-plus'

const baseURL = 'http://localhost:8080';


const instance = axios.create({
  baseURL,
  timeout: 5000,
})

instance.interceptors.request.use(
  (config) => {
    config.headers.token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbXBJZCI6MSwiZXhwIjoxNzM0MDI0MDkyfQ.F9joaXl13FeU3qPNtmmcpeK7o1R3ldJtUA8hvQMxUeA'
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (response) => {
    console.log(response.data)
    if(response.data.code === 1) {
      return response
    }
    console.log(response.data)
    ElMessage({message: response.data.msg || '服务器异常',type: 'error'})
    return Promise.reject(response)
  },
  (err) => {
    console.log(err.message)
    ElMessage({ message: err.message || '服务异常', type: 'error' })

    return Promise.reject(err)
  }
)

export default instance
