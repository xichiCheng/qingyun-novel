<script setup>
const props = defineProps({
  title: String,
  type: String,
  books: Array,
  img: String,
})
</script>

<template>
  <div class="rank">
    <span class="title">{{ title }}</span>
    <div class="numberOne">
      <span class="numberOneIcon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-guanjun2"></use>
        </svg>
      </span>
      <span class="name">{{ books[0].name }}</span>
      <span v-if="type==='0'" class="number">{{ books[0].number }}<span>月票</span></span>
      <span v-else-if="type==='1'" class="number">
        销量冠军
      </span>
      <span v-else-if="type==='2'" class="number">{{ books[0].number }}<span>推荐票</span></span>
      <span v-else-if="type==='3'" class="number">{{ books[0].number }}<span>收藏</span></span>
      <span class="introduced"> {{ books[0].type }} · {{ books[0].author }} </span>
      <span class="img">
        <el-image :src="img"></el-image>
      </span>
    </div>
    <div class="remaining">
      <ul>
        <li v-for="(item, index) in books.slice(1, 10)" :key="item.id" >
          <span class="index" :class="[index === 0 ? 'numberTwo' : '',index === 1 ? 'numberThree' : '']">{{ index+2 }}</span>
          <span class="name"> {{ item.name }}</span>
          <span class="number"> {{ item.number }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rank {
  height: 500px;
  width: 228px;
}

.title {
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;
  width: 210px;
  border-bottom: 1px solid #636363;
  font-size: 20px;
  font-family: '华文中宋', serif;
}

.numberOne {
  position: relative;
  height: 110px;
  border-bottom: 1px solid #dad8d8;
  padding-bottom: 10px;
  .numberOneIcon{
    position: absolute;
    top: 10px;
    left: 8px
  }
  .name {
    position: absolute;
    top: 45px;
    left: 5px;
    max-width: 140px;
    font-size: 15px;
    overflow: hidden; /* 隐藏超出部分 */
    white-space: nowrap; /* 不换行 */
    text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
  }
  .number {
    position: absolute;
    top: 70px;
    left: 5px;
    color: #ed0b38;
    font-size: 20px;
    span{
      font-size: 15px;
    }
  }

  .introduced {
    top: 100px;
    position: absolute;
    left: 5px;
    font-size: 14px;
    color: #aeacac;
    font-family: "仿宋", serif;
  }
  .img{
    top: 10px;
    right: 10px;
    position: absolute;
    height: 100px;
    width: 70px;
    border: 1px solid #bcbaba;
  }
}

.remaining{
  ul{
    margin-top: 10px;
    width: 250px;
  }

  li{
    list-style: none;
    width: 250px;
    height: 35px;
    margin-left: -40px;
    line-height: 35px;

    .index{
      display: inline-block;
      background-color: #ededed;
      line-height: 20px;
      padding-left: 5px;
      align-content: center;
      height: 20px;
      width: 15px;
    }

    .numberTwo{
      background-color: #ff815e;
      color: white;
    }

    .numberThree{
      background-color: #ffa95e;
      color: white;
    }

    .name{
      margin-left: 10px;
      padding-bottom: 7px;
      border-bottom: 1px solid #dad8d8;
      font-family: '宋体', serif;
      font-size: 14px;

      overflow: hidden; /* 隐藏超出部分 */
      white-space: nowrap; /* 不换行 */
      text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
    }

    .number{
      margin-left: 22px;
      padding-bottom: 15px;
      font-size: 12px;
      font-family: '宋体', serif;
      color: #b3b3b3;
    }


  }
}
</style>
