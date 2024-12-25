<script setup>
import { ref } from 'vue'
import { ArrowDown, Search } from '@element-plus/icons-vue'
import router from '@/router/index.js'

const searchQuery = ref('')
const handleSearch = () => {
  const newRoute = router.resolve({ name: 'Search', params: { words: searchQuery.value } });
  window.open(newRoute.href, '_blank'); // '_blank' 表示在新标签页打开
  searchQuery.value=''
};
const toUser = ()=>{
  const newRoute = router.resolve({ name: 'User'});
  window.open(newRoute.href, '_blank');
}


const isLoggedIn = ref(true)

const user = ref({
  username: 'Aurore',
})

const categories = ref([
  { id: 1, name: '古代言情' },
  { id: 2, name: '仙侠奇缘' },
  { id: 3, name: '现代言情' },
  { id: 4, name: '浪漫青春' },
  { id: 5, name: '玄幻言情' },
  { id: 6, name: '悬疑推理' },
  { id: 7, name: '科幻空间' },
  { id: 8, name: '游戏竞技' },
  { id: 9, name: '衍生同人' },
  { id: 10, name: '现实生活' },
])
</script>

<template>
  <div class="nav-bar">
    <!-- Logo -->
    <div class="logo">轻云小说网</div>

    <!-- 全部分类下拉菜单 -->
    <el-dropdown class="dropdown-container" show-timeout="10">
      <span class="el-dropdown-link">
        全部分类<el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <div class="dropdown-content">
          <span v-for="(category, index) in categories" :key="index">
            <router-link :to="{ name: 'Category', params: { id: category.id } }" target="_blank">{{
              category.name
            }}</router-link>
          </span>
        </div>
      </template>
    </el-dropdown>

    <span class="rank"><router-link :to="{ name: 'Rank' }" target="_blank">排行</router-link></span>

    <!-- 搜索栏 -->
    <div class="search">
      <el-input
        v-model="searchQuery"
        placeholder="输入小说、作者"
        class="search-input"
        :prefix-icon="Search"
      >
        <template #append>
          <el-button @click="handleSearch" color="#19bad8">搜索</el-button>
        </template>
      </el-input>
    </div>

    <div v-if="isLoggedIn">
      <!-- 用户已登录 -->
      <div class="user-info">
        <span>欢迎~&nbsp;&nbsp;&nbsp;</span>
        <router-link @click="toUser" to="/user" class="myInfo">{{ user.username }}</router-link>
        <span class="split">|</span>
        <router-link to="/login" class="logout">退出</router-link>
      </div>
    </div>
    <div v-else>
      <div class="user-dropdown">
        <router-link to="/login" class="btn login-btn">登录</router-link>
        <span class="split">|</span>
        <router-link to="/register" class="btn register-btn">注册</router-link>
      </div>
    </div>
    <span class="split">|</span>
    <!-- 我的书架按钮 -->
    <span class="bookshelf">
      <svg class="icon bookshelfIcon" aria-hidden="true">
        <use xlink:href="#icon-wodeshujia"></use>
      </svg>
      书架
    </span>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}

.nav-bar {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #ddd;
  height: 60px;
}

.logo {
  font-size: 25px;
  color: #19bad8;
  font-family: '华文楷体', serif;
  margin-right: 20px;
  margin-left: 100px;
}

.dropdown-container {
  width: 85px;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  outline: none;
  border-radius: 10px;
}

.dropdown-container:hover {
  background: #e6e5e5; /* 鼠标悬停时背景颜色加深 */
}

/* 下拉内容样式：两列布局 */
.dropdown-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列 */
  gap: 10px; /* 子项间距 */
  padding: 10px;

  a{
    text-decoration: none;
    color: black;
  }
}

/* 下拉菜单项的默认样式 */
.dropdown-content span {
  background: #f5f5f5; /* 默认背景色 */
  padding: 8px;
  text-align: center;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease; /* 增加过渡效果 */
}

/* 鼠标悬停样式：加深颜色，去掉边框 */
.dropdown-content span:hover {
  background: #d3d1d1; /* 鼠标悬停时背景颜色加深 */
  transform: scale(1.05); /* 悬停时微放大效果（可选） */
}

.rank {
  width: 50px;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  outline: none;
  border-radius: 10px;
  font-size: 15px;

  a{
    text-decoration: none;
    color: #636363;
  }
}

.rank:hover {
  background: #e6e5e5;
}

.search {
  flex: 1;
  max-width: 300px;
  margin-right: 20px;
  margin-left: 20px;
}

.user-info {
  float: right;
  font-size: 14px;
  font-family: '仿宋', serif;
  margin-left: 100px;

  .myInfo {
    text-decoration: none;
    color: #6c6b6b;
    margin-right: 8px;
  }

  .myInfo:hover {
    color: crimson;
  }

  .logout {
    text-decoration: none;
    color: #d9dfe9;
    margin-left: 8px;
    margin-right: 10px;
  }

  .logout:hover {
    color: crimson;
  }
}

.user-dropdown {
  float: right;
  margin-left: 100px;

  .btn {
    font-size: 13px;
    margin-right: 8px;
    border: none;
    text-decoration: none;
    font-weight: 300;
    border-radius: 12px;
    display: inline-block;
    width: 50px;
    height: 30px;

    line-height: 30px;
    text-align: center;
  }

  .btn:hover {
    color: crimson;
    background: #e6e5e5;
  }

  span {
    color: #d9dfe9;
  }

  .login-btn {
    color: #6c6b6b;
  }

  .register-btn {
    color: #d9dfe9;
    margin-left: 8px;
  }
}

.split {
  color: #aeaeaf;
  font-size: 16px;
  font-family: serif;
}

.bookshelfIcon {
  width: 20px;
  height: 20px;
}

.bookshelf {
  width: 70px;
  height: 30px;
  padding-left: 15px;
  margin-left: 10px;
  outline: none;

  line-height: 30px;
  align-content: center;
  border-radius: 12px;
  font-size: 15px;
  color: #636363;
}

.bookshelf:hover {
  background: #e6e5e5;
  color: #ed0b38;
}
</style>
