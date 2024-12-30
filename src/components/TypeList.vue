<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import router from '@/router/index.js'

const props = defineProps({
  id: Number,
  title: String,
  img: String,
  books: Array,
})
const toBookDetail = (bookId) => {
  const newRoute = router.resolve({ name: 'BookDetail', params: { id: bookId }})
  window.open(newRoute.href, '_blank')
}
</script>

<template>
<div class="type">
  <span class="title">
    <span>{{ title }}</span>
     <router-link :to="{ name: 'Category', params: { id: props.id } }" target="_blank">
       <el-icon class="icon"><ArrowRight /></el-icon>
     </router-link>
  </span>
  <div class="numberOne">
    <span class="img">
        <el-image :src="img"></el-image>
    </span>
    <span class="name" @click="toBookDetail(books[0].id)" style="cursor: pointer">{{ books[0].name }}</span>
    <span class="author"> {{ books[0].author }}</span>
    <div class="profile">
      {{ books[0].shortProfile }}
    </div>
  </div>
  <div class="more">
    <ul>
      <li v-for="(item,index) in books.slice(1, 10)" :key="item.id">
        <a :class="index<3 ? 'active':''" @click="toBookDetail(item.id)">{{item.name}}</a>  <span>| {{item.shortProfile}}</span>
      </li>
    </ul>
  </div>
</div>
</template>

<style scoped lang="scss">
.type{
  height: 450px;
  width: 285px;
  padding: 4px;
}

.title {
  padding-left: 10px;
  padding-right: 160px;
  padding-bottom: 5px;
  width: 100%;
  border-bottom: 1px solid #636363;
  font-size: 22px;
  font-family: '华文中宋', serif;
  position: relative;
  .icon{
    position: absolute;
    margin-top: 5px;
    right: 5px;
    color: #6c6b6b;
  }

  .icon:hover {
    color: #ed0b38;
  }
}

.numberOne{
  position: relative;
  height: 130px;
  width: 260px;
  border-bottom: 1px solid #dad8d8;
  padding-bottom: 10px;

  .img{
    top: 16px;
    left: 15px;
    position: absolute;
    height: 110px;
    width: 80px;
    border: 1px solid #bcbaba;
  }
  .name{
    position: absolute;
    top: 20px;
    left: 105px;
    max-width: 145px;
    font-size: 16px;
    font-family: '华文中宋', serif;
    color: #109cb6;

    overflow: hidden; /* 隐藏超出部分 */
    white-space: nowrap; /* 不换行 */
  }
  .author{
    position: absolute;
    top: 55px;
    left: 105px;
    font-size: 12px;
    font-weight: 300;
    font-family: '华文中宋', serif;
    color: #109cb6;
  }
  .profile{
    position: absolute;
    top: 84px;
    left: 105px;
    font-size: 13px;
    font-family: '华文中宋', serif;

    max-width: 135px;
    display: -webkit-box; /* 创建弹性盒子布局 */
    -webkit-box-orient: vertical; /* 设置盒子垂直布局方向 */
    overflow: hidden; /* 隐藏超出部分 */
    -webkit-line-clamp: 2;
  }

}

.more{
  ul{

  }

  li{
    list-style: none;
    max-width: 249px;
    overflow: hidden; /* 隐藏超出部分 */
    white-space: nowrap; /* 不换行 */
    margin-left: -32px;
    margin-bottom: 5px;
    line-height: 22px;
  }

  a{
    font-size: 14px;
    font-family: '华文楷体', serif;
    cursor: pointer;
  }
  span{
    font-size: 13px;
    font-family: '仿宋', serif;
    color: #aeacac;
  }

  .active{
    color: #ed0b38;
  }
}

</style>
