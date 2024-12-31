import { defineStore } from 'pinia'
import { ref } from 'vue'

// 分类信息模块
export const useCategoryStore = defineStore(
  'category-store',
  () => {
    // 定义分类数据
    const categories = ref([]) // 用于存储分类信息

    // 设置分类数据
    const setCategories = (data) => {
      categories.value = data
    }

    // 获取分类数据
    const getCategories = () => {
      return categories.value
    }

    const getCategory = (id) => {
      // 找到对应的一级分类
      return categories.value.find((category) => category.id === id)
    }

    const getSubCategories = (id) => {
      const category = categories.value.find((category) => category.id === id) // 找到对应的一级分类
      if (category) {
        return category.subcategory // 返回二级分类
      }
      return [] // 如果没有找到对应的分类，返回空数组
    }

    const getSubCategory = (id,subId) => {
      const category = categories.value.find((category) => category.id === id)
      return category.subcategory.find((subcategory) => subcategory.id === subId)
    }

    return { categories, setCategories, getCategories, getCategory, getSubCategories,getSubCategory }
  },
  {
    persist: true, // 持久化分类信息
  },
)

export default useCategoryStore
