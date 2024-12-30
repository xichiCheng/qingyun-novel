import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/User.js'

// 用户模块
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('') // 定义 token
    const setToken = (t) => (token.value = t) // 设置 token
    const removeToken = () => (token.value = '')

    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      console.log(res)
      user.value = res.data.data
    }
    const setUser = (obj) => {
      user.value = obj
    }
    return { token, user, setToken, removeToken, getUser,setUser}
  },
  {
    persist: true // 持久化
  }
)

export default useUserStore
