<script setup>
import { ref} from 'vue'
import { ElMessage } from 'element-plus'

const searchQuery = ref('') // 搜索框内容

const books = ref(
  Array.from({ length: 10 }, () => (
    { id: 2, sign: true, category: '现代言情', name: '全职高手', latestChapter: '第500章 荣耀之巅第500章 荣耀之巅第500章 荣耀之巅', updateTime: '2024-12-23 22:00', author: '蝴蝶蓝' }
  )))
const selectedBooks = ref([]) // 被选中的书籍
const isBottomBarVisible = ref(false) // 底部操作栏是否可见

// 置顶功能
const handleTop = (book) => {
  book.sign = !book.sign
  ElMessage.success(`已${book.sign ? '置顶' : '取消置顶'}: ${book.name}`)
}

// 删除功能
const handleDelete = (book) => {
  books.value = books.value.filter((item) => item.id !== book.id)
  ElMessage.success(`已删除: ${book.name}`)
}

// 批量操作功能
const handleBatchTop = () => {
  selectedBooks.value.forEach((bookId) => {
    const book = books.value.find((item) => item.id === bookId)
    if (book) book.sign = true
  })
  ElMessage.success('已批量置顶选中书籍')
}

const handleBatchDelete = () => {
  books.value = books.value.filter((item) => !selectedBooks.value.includes(item.id))
  selectedBooks.value = []
  ElMessage.success('已批量删除选中书籍')
}

// 页面滚动检测
const handleScroll = () => {
  isBottomBarVisible.value = true
}

window.addEventListener('scroll', handleScroll)
</script>

<template>
  <div class="main">
    <!-- 搜索框 -->
    <div class="input">
      <input type="text" placeholder="搜索小说、作者" />
      <button>搜索</button>
    </div>

    <!-- 书架表单 -->
    <div class="bookshelf">
      <el-table
        :data="books"
        style="width: 100%"
        :cell-style="{ padding: '12px 0' }"
        @selection-change="(selection) => (selectedBooks.value = selection.map((item) => item.id))"
      >
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column prop="sign"  width="50">
          <template #default="{ row }">
          <span v-if="row.sign">
            <svg class="icon accountIcon" aria-hidden="true" style="height: 20px;width: 20px;">
            <use xlink:href="#icon-cangpeitubiao_zhiding"></use>
          </svg>
          </span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="80"></el-table-column>
        <el-table-column prop="name" label="书名/最新章" min-width="204" :show-overflow-tooltip="true">
          <template #default="{ row }">
            <div>{{ row.name }} <span class="latest-chapter"> {{ row.latestChapter }}</span></div>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="150"></el-table-column>
        <el-table-column prop="author" label="作者" width="100"></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button @click="handleTop(row)" size="small" type="success"
            >{{ row.sign ? '取消置顶' : '置顶' }}</el-button
            >
            <el-button @click="handleDelete(row)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <!-- 底部操作栏 -->
    <div v-if="isBottomBarVisible" class="bottom-bar">
      <el-button @click="() => (selectedBooks.value = books.value.map((item) => item.id))">
        全选
      </el-button>
      <el-button @click="handleBatchTop" type="success" plain>置顶</el-button>
      <el-button @click="handleBatchDelete" type="danger" plain>删除</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  padding: 0 20px;
}
.input {
  position: relative;
  height: 40px;
  font-size: 15px;
  float: left;
  border: 1px solid #ccc;
  background-color: white;
  width: 400px;
  margin-left: 200px;
  margin-top: 20px;
  margin-bottom: 35px;

  input {
    margin-top: 12px;
    margin-left: 12px;
    border: none;
    outline: none;
    width: 305px;
  }

  button {
    position: absolute;
    right: -1px;
    width: 75px;
    height: 40px;
    padding: 0 15px;
    border: none;
    background-color: #19bad8;
    color: white;
    border-left: 1px solid #ccc;
    font-size: 15px;
  }

  button:hover {
    opacity: 0.8;
  }
}

.latest-chapter {
  margin-left: 14px;
  font-size: 12px;
  color: #999;
}

.bookshelf{
  margin-bottom: 50px;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  justify-content: center;
  gap: 20px;
  border-top: 1px solid #ebeef5;
  z-index: 10;
}
</style>
