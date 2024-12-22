<script setup>
import { ref ,onMounted,onBeforeUnmount } from 'vue'
import ComShortcut from '@/components/ComShortcut.vue'
import ComHeader from '@/components/ComHeader.vue'
import ComAffix from '@/components/ComAffix.vue'

//固定
const showAffix = ref(false)
const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  // 滑动到 200px 显示 Affix
  showAffix.value = scrollTop > 200
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <ComShortcut></ComShortcut>
    <ComHeader></ComHeader>
    <el-affix v-if="showAffix" :offset="0" class="affix-container">
      <ComAffix></ComAffix>
    </el-affix>
    <div class="container w">
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="$route.path" router>
            <el-menu-item index="/rank/">人气榜单</el-menu-item>
            <el-divider content-position="left">热门作品排行</el-divider>
            <el-menu-item index="/rank/pass">月票榜</el-menu-item>
            <el-menu-item index="/rank/selling">畅销榜</el-menu-item>
            <el-menu-item index="/rank/new">新书热销榜</el-menu-item>
            <el-menu-item index="/rank/recommend">推荐榜</el-menu-item>
            <el-menu-item index="/rank/collection">收藏榜</el-menu-item>
            <el-menu-item index="/rank/words">总字数榜</el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
.w {
  width: 1030px;
  margin: 0 auto;
}

.container {
  margin-top: 140px;
}
</style>
