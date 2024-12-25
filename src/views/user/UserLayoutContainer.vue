<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import ComAffix from '@/components/ComAffix.vue';

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 动态样式
const affixStyle = computed(() => ({
  backgroundColor: isScrolled.value ? '#fff' : 'transparent',
  boxShadow: isScrolled.value ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
}));
</script>

<template>
  <div class="main">
    <el-affix :offset="0">
      <ComAffix :style="affixStyle" />
    </el-affix>
    <div class="container w">
      <el-container>
        <!-- 左侧导航 -->
        <el-aside width="160px">
          <el-menu :default-active="$route.path" router>
            <el-menu-item index="/user/">个人中心</el-menu-item>
            <el-menu-item index="/user/account">账务中心</el-menu-item>
            <el-menu-item index="/user/bookshelf">我的书架</el-menu-item>
            <el-menu-item index="/user/tickets">我的票夹</el-menu-item>
            <el-menu-item index="/user/reviews">我的书评</el-menu-item>
            <el-menu-item index="/user/setting">个人信息设置</el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主内容区域 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  background: radial-gradient(circle at 10% 20%, rgb(239, 246, 249) 0%, rgb(206, 239, 253) 90%);
  min-height: 100vh;
  margin: -6px;
}
.w {
  width: 1000px;
  margin: 0 auto;
}

.container{
  margin-top: 40px;
  margin-left: 100px;
}

</style>


