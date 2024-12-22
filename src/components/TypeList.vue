<script setup>
const props = defineProps({
  title: String,
  img: String,
  books: Array,
})
</script>

<template>
<div class="type">
  <span class="title">
    {{ title }}
  </span>
  <div class="numberOne">
    <span class="img">
        <el-image :src="img"></el-image>
    </span>
    <span class="name">{{ books[0].name }}</span>
    <span class="author"> {{ books[0].author }}</span>
    <div class="profile">
      {{ books[0].shortProfile }}
    </div>
  </div>
  <div class="more">
    <ul>
      <li v-for="(item,index) in books.slice(1, 10)" :key="item.id">
        <a :class="index<3 ? 'active':''">{{item.name}}</a>  <span>| {{item.shortProfile}}</span>
      </li>
    </ul>
  </div>
</div>
</template>

<style scoped lang="scss">
.type{
  height: 430px;
  width: 228px;
  padding: 4px;
}

.title {
  padding-left: 10px;
  padding-right: 120px;
  padding-bottom: 5px;
  width: 100%;
  border-bottom: 1px solid #636363;
  font-size: 20px;
  font-family: '华文中宋', serif;
}

.numberOne{
  position: relative;
  height: 110px;
  border-bottom: 1px solid #dad8d8;
  padding-bottom: 10px;

  .img{
    top: 11px;
    left: 15px;
    position: absolute;
    height: 100px;
    width: 70px;
    border: 1px solid #bcbaba;
  }
  .name{
    position: absolute;
    top: 18px;
    left: 90px;
    max-width: 135px;
    font-size: 15px;
    font-family: '华文中宋', serif;
    color: #109cb6;

    overflow: hidden; /* 隐藏超出部分 */
    white-space: nowrap; /* 不换行 */
  }
  .author{
    position: absolute;
    top: 55px;
    right: 10px;
    font-size: 12px;
    font-weight: 300;
    font-family: '华文中宋', serif;
    color: #109cb6;
  }
  .profile{
    position: absolute;
    top: 80px;
    left: 90px;
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
    max-width: 213px;
    overflow: hidden; /* 隐藏超出部分 */
    white-space: nowrap; /* 不换行 */
    margin-left: -30px;
    margin-bottom: 5px;
  }

  a{
    font-size: 13px;
    font-family: '仿宋', serif;
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
