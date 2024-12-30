<script setup>
import { ref } from 'vue'
import { Reading } from '@element-plus/icons-vue'
import router from '@/router/index.js'
const words = ref('')
const search = () =>{
  if(words.value==='')
    return
  const newRoute = router.resolve({ name: 'Search', params: { words: words.value } });
  window.open(newRoute.href, '_blank'); // '_blank' 表示在新标签页打开
  words.value = ''
}
const bookshelf = ()=>{
  const newRoute = router.resolve({ name: 'UserBookshelf'});
  window.open(newRoute.href, '_blank');
}
</script>

<template>
  <div class="header w">
    <div class="logo">
      <img src="@/assets/img/轻云.png" alt="轻云小说网 Logo" class="logo-img" />
      <span>专注于女性小说阅读平台</span>
    </div>
    <div class="search">
      <input type="text" v-model="words" @keydown.enter="search" placeholder="搜索小说、作者" >
      <button @click="search" >搜索</button>
    </div>
    <div class="bookshelf">
      <el-button @click="bookshelf">
        <el-icon size="25px" ><Reading /></el-icon><span>我的书架</span>
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.w {
  width: 950px;
  margin: 0 auto;
}


.header{
  .logo{
    float: left;

    .logo-img {
      height: 80px;
      display: block;
    }

    span{
      font-size: 15px;
      font-family: "华文新魏",serif;
    }
  }

  .search{
    height: 40px;
    font-size: 15px;
    float: left;
    border: 1px solid #ccc;
    border-radius: 20px;
    width: 400px;
    margin-left: 120px;
    margin-top: 35px;
    padding-bottom: 2px;
    input{
      margin-bottom: 5px;
      margin-left: 14px;
      border: none;
      outline: none;
      width: 312px;
      font-size: 15px;
    }
    button{
      width: 70px;
      height: 42px;
      padding: 0 15px;
      border: none;
      background-color: #19bad8;
      color: white;
      border-left: 1px solid #ccc;
      font-size: 16px;
      border-radius: 0 20px 20px 0;
    }
    button:hover{
      opacity: 0.8;
    }
  }

  .bookshelf{
    float: left;
    margin-top: 35px;
    margin-left: 100px;

    button{
      height: 40px;
      width: 120px;
      background-color: #ffffff;
      border-radius: 20px;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 40px;

    }
  }
}
</style>
