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
    const getBookById =  (id) => {
      console.log(id)
      const books = user.value.books
      if(!books) return null
      const book = books.find((book) => book.id === id) // 找到对应的一级分类
      console.log(book)
      return book || null
    }
    const setUser = (obj) => {
      user.value = obj
    }
    return { token, user, setToken, removeToken, getUser,setUser,getBookById}
  },
  {
    persist: true // 持久化
  }
)

export default useUserStore
