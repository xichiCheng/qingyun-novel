import request from '@/utiles/request.js'

export const userRegisterService = async ({ username, password, repassword }) => {
  // 返回响应的数据
  return await request.post('/api/reg', { username, password, repassword }) // 假设响应的数据在 response.data 中
}

export const userLoginService = async ({ username, password}) => {
  return await request.post('/api/login', { username, password})
}

export const userGetInfoService = async () => request.get('/my/userinfo')
