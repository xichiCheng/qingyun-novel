<script setup>
import { ref } from 'vue'

const props = defineProps({
  rankBook: {
    type: Array,
    required: true,
  },
})

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const params = ref({
  category: 0, // 主分类
  pageNum: 1, // 当前页码
  pageSize: 10, // 每页条数
})

const total = ref(100) // 确保 total 是大于 0 的数字


const onSizeChange = (size) => {
  params.value.pageNum = 1
  params.value.pageSize = size
}
const onCurrentChange = (currentPage) => {
  params.value.pageNum = currentPage
}


</script>

<template>
  <div class="books">
    <div class="book-card" v-for="book in rankBook" :key="book.id">
      <span class="img">
        <span v-if="book.rank <= 3" :class="['sign', `rank-${book.rank}`]">
          {{ book.rank }}
          <span class="triangle" v-if="book.rank <= 3" :class="`triangle-${book.rank}`"></span>
        </span>
        <span v-else class="sign">
          {{ book.rank }}
        </span>
        <img :src="book.cover" alt="书籍封面" class="book-cover" />
      </span>
      <p class="name">{{ book.title }}</p>
      <p class="author">
        <el-avatar :size="12" :src="circleUrl" />
        {{ book.author }} | {{ book.category }}·{{ book.secondary_category }} |
        {{ book.status === 'completed' ? '完结' : '连载中' }}
      </p>
      <p class="profile">{{ book.profile }}</p>
      <p class="chapters">最近更新 {{ book.latestChapters }}</p>
      <p class="time">{{ book.latestTime }}</p>
      <el-button class="detail button">书籍详情</el-button>
      <el-button class="bookshelf button">加入书架</el-button>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="params.pageNum"
        v-model:page-size="params.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :total="total"
        layout="sizes,prev, pager, next, jumper"
        background
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        style="margin-top: 20px; justify-content: flex-end"
      ></el-pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
.books {
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  .book-card {
    border-bottom: 1px solid #ddd;
    border-radius: 5px;
    padding-bottom: 18px;
    width: 750px;
    height: 155px;
    position: relative;

    .img {
      .sign {
        position: absolute;
        top: 10px;
        left: 1px;
        height: 25px;
        line-height: 25px;
        padding-left: 5px;
        padding-right: 6px;
        font-size: 20px;
        color: white;
        font-family: '华文中宋', serif;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;

      }

      .triangle{
        position: absolute;
        top:25px;
        left: 0;
        width: 0;
        height: 0;
        line-height: 0;
        font-size: 0;
        border-left: 12px solid transparent; /* 左边框宽度 */
        border-right: 12px solid transparent; /* 右边框宽度 */
        border-top: 8px solid pink;
      }

      .triangle-1{
        border-top-color: #ed0b38;
      }
      .triangle-2{
        border-top-color: #e67225;
      }
      .triangle-3{
        border-top-color: #e6bf25;
      }
      .rank-1{
        background-color: #ed0b38;
      }
      .rank-2{
        background-color: #e67225;
      }
      .rank-3{
        background-color: #e6bf25;
      }

      .book-cover {
        position: absolute;
        top: 10px;
        height: 135px;
        width: 100px;
        border: 1px solid #ddd;
      }
    }

    .name {
      position: absolute;
      top: -5px;
      left: 130px;
      font-size: 18px;
    }

    .author {
      position: absolute;
      left: 130px;
      top: 35px;
      font-size: 13px;
      color: #7c7b7b;
      font-family: 'fangsong', serif;
      max-width: 255px;
      overflow: hidden;
      white-space: nowrap;
    }

    .profile {
      position: absolute;
      left: 130px;
      top: 58px;
      font-family: '', serif;
      font-size: 14px;
      line-height: 23px;
      display: -webkit-box; /* 创建弹性盒子布局 */
      -webkit-box-orient: vertical; /* 设置盒子垂直布局方向 */
      overflow: hidden; /* 隐藏超出部分 */
      text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
      -webkit-line-clamp: 2;
    }

    .chapters {
      position: absolute;
      left: 130px;
      top: 120px;
      font-size: 12px;
    }

    .time {
      position: absolute;
      left: 300px;
      top: 120px;
      font-size: 12px;
    }

    .button {
      position: absolute;
      left: 550px;
      top: 120px;
    }

    .bookshelf {
      left: 650px;
    }
  }
}
</style>
