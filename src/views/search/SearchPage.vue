<script setup>
import { ref, computed } from 'vue'
import ComAffix from '@/components/ComAffix.vue'

const props = defineProps({
  words: {
    type: String,
  }
})
const sortOrder = ref('relevance')
const referralTicket = ref('weekly')

const params = ref({
  category: 0, // 主分类
  status: 0, // 状态
  attribute: 0, // 属性
  wordRange: 0, // 字数范围
  pageNum: 1, // 当前页码
  pageSize: 10, // 每页条数
})
const total = ref(100)

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
const wordRange = ref([
  { id: 1, range: '30万字以下' },
  { id: 2, range: '30万-50万字' },
  { id: 3, range: '50万-100万字' },
  {
    id: 4, range: '100万字-200万字',
  },
  { id: 5, range: '200万字以上' },
])
const setCategory = (num) => {
  params.value.category = num
}
const setStatus = (num) => {
  params.value.status = num;
}
const setAttribute = (num) => {
  params.value.attribute = num;
}
const setWord = (word) => {
  params.value.wordRange = word
}

const selectedChoices = computed(() => {
  const choices = []
  if (params.value.category) {
    const category = categories.value.find(c => c.id === params.value.category)
    if (category) choices.push(category.name) // 去掉 `${category.name}` 前的空格
  }
  if (params.value.status) {
    const statusMap = { 1: '连载', 2: '完本' }
    choices.push(statusMap[params.value.status]) // 去掉前的空格
  }
  if (params.value.attribute) {
    const attributeMap = { 1: '免费', 2: 'VIP' }
    choices.push(attributeMap[params.value.attribute]) // 去掉前的空格
  }
  if (params.value.wordRange !== 0) {
    const word = wordRange.value.find(w => w.id === params.value.wordRange)
    if (word) choices.push(word.range) // 去掉前的空格
  }
  return choices
})

const del = (choice) => {
  console.log(choice)
  const category = categories.value.find(c => c.name === choice)
  if (category) {
    params.value.category = 0 // 重置分类
    return
  }

  const statusMap = {1: '连载', 2: '完本' }
  const statusKey = Object.keys(statusMap).find(key => statusMap[key] === choice)
  if (statusKey) {
    params.value.status = 0 // 重置状态
    return
  }

  const attributeMap = { 1: '免费', 2: 'VIP' }
  const attributeKey = Object.keys(attributeMap).find(key => attributeMap[key] === choice)
  if (attributeKey) {
    params.value.attribute = 0 // 重置属性
    return
  }

  const word = wordRange.value.find(w => w.range === choice)
  if (word) {
    params.value.wordRange = 0 // 重置字数范围
  }
}
const clear = () => {
  params.value.category=0;
  params.value.status=0;
  params.value.attribute=0;
  params.value.wordRange=0;
}
const books = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: '喜欢你我说了算',
    author: '叶非夜',
    wordCount: 603000,
    category: '现代言情',
    secondary_category: '豪门世家',
    cover:
      'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/600.webp',
    status: 'complet',
    profile:
      '林薇：我要上清华。\n' +
      '江宿：我就不一样了。\n' +
      '江宿：我除了要上清华，还要……你。\n' +
      '…\n' +
      '誓要上清华的学霸女主VS伪学霸真桀骜的男主\n' +
      '…\n' +
      '我这样的人不值得你喜欢。\n' +
      '喜欢你我说了算。\n' +
      '…\n' +
      '【无论过去多少年，江宿和林薇都不会忘记那一天，那是他和她见面的第一天。】',
    collection: 967999,
    latestChapters: '第337章 我愿望都实现了呢',
    latestTime: '2022-11-25 16:27',
    recommended: 9899900
  })),
)
function formatNumberToWan(number) {
  return (number / 10000).toFixed(2)
}

books.value = books.value.map((book) => ({
  ...book,
  wordCount: formatNumberToWan(book.wordCount),
  recommended: formatNumberToWan(book.recommended),
}))
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const onSizeChange = (newSize) => {
  params.value.pageSize = newSize
  params.value.pageNum = 1 // 重置到第一页
}

const onCurrentChange = (newPage) => {
  params.value.pageNum = newPage
}

const handleSortChange = () => {
  sortOrder.value = referralTicket.value // 当选择推荐票时，设置当前排序为推荐票
  console.log(sortOrder.value)
}
</script>

<template>
  <el-affix :offset="0">
    <ComAffix></ComAffix>
  </el-affix>
  <div class="w">
    <div class="input">
      <input type="text" placeholder="搜索小说、作者" />
      <button>搜索</button>
    </div>
    <div class="filter">
      <div class="choice">
        <span class="title">已选: </span>
        <span  v-for="choice in selectedChoices" :key="choice" class="choice-item active">{{ choice }} <span class="del" @click="del(choice)">×</span></span>
        <span class="active" v-if="selectedChoices.length===0">全部</span>
        <span v-else class="clear" @click="clear">清除全部 </span>
      </div>
      <div class="category">
        <span class="title">分类: </span>
        <span
          v-for="category in categories"
          :key="category.id"
          class="category-item"
          @click="setCategory(category.id)"
        >
          {{ category.name }}
        </span>
      </div>
      <div class="status">
        <span class="title">状态: </span>
        <span @click="setStatus(1)">连载</span>
        <span @click="setStatus(2)">完本</span>
      </div>
      <div class="attribute">
        <span class="title">属性: </span>
        <span @click="setAttribute(1)">免费</span>
        <span @click="setAttribute(2)">VIP</span>
      </div>
      <div class="words">
        <span class="title">字数: </span>
        <span v-for="word in wordRange" :key="word.id" @click="setWord(word.id)">{{word.range}}</span>
      </div>
    </div>
    <div class="sort">
      <div class="sort-div">
        <span :class="{ active: sortOrder === 'relevance' }" @click="sortOrder = 'relevance'">搜索相关性</span>
        <span :class="{ active: sortOrder === 'updateTime' }" @click="sortOrder = 'updateTime'">更新时间</span>
        <span :class="{ active: sortOrder === 'popularity' }" @click="sortOrder = 'popularity'">
            人气排序
          </span>
        <span :class="{ active: sortOrder === 'totalFavorites' }" @click="sortOrder = 'totalFavorites'">
            总收藏
          </span>
        <span :class="{ active: sortOrder === 'totalWords' }" @click="sortOrder = 'totalWords'">
            总字数
          </span>
        <span>
            <select
              v-model="referralTicket"
              @change="handleSortChange"
              :class="{ active: sortOrder === referralTicket }"
              class="referral-ticket"
            >
              <option value="weekly" style="color: black">周推荐票</option>
              <option value="monthly" style="color: black">月推荐票</option>
              <option value="total" style="color: black">总推荐票</option>
            </select>
          </span>
      </div>
      <div class="tips"> <span>{{props.words}}</span> 的相关作品</div>
    </div>
    <div class="books">
      <div class="book-card" v-for="book in books" :key="book.id">
      <span class="img">
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
        <p class="wordCount"><span>{{book.wordCount }}万</span> 总字数</p>
        <p class="recommended"><span>{{ book.recommended }}万</span> 总推荐</p>
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

  </div>
</template>

<style scoped lang="scss">
.w {
  width: 800px;
  margin: 0 auto;
}

.input {
  position: relative;
  height: 40px;
  font-size: 15px;
  float: left;
  border: 1px solid #ccc;
  width: 400px;
  margin-left: 200px;
  margin-top: 35px;
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

.filter {
  background-color: #eefcff;
  width: 800px;
  height: 260px;
  display: flex;
  gap: 25px;
  flex-direction: column;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  .title{
    font-family: '华文中宋', serif;
  }
  span{
    font-size: 14px;
    font-family: "宋体", serif;
    padding: 5px 3px;
    margin-left: 18px;

  }

  .category{
    line-height: 30px;
    margin-bottom: -10px;
  }

  .choice{
    .del{
      font-weight: bold;
      margin-left: -5px;
    }

    .clear:hover{
      color: #ed0b38;
    }
  }

  .active{
    background-color: #ed0b38;
    color: white;
  }



}

.sort {
  width: 820px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #eefcff;

  .sort-div{
    float: left;
    span {
      line-height: 40px;
      margin: 0 10px;
      padding-left: 12px;
      font-size: 13px;
      color: #9e9b9b;
    }

    .referral-ticket {
      font-size: 13px;
      color: #9e9b9b;
    }

    select {
      width: 100px; /* 下拉框的宽度 */
      border: none; /* 去掉边框 */
      outline: none; /* 去掉焦点时的轮廓 */
      background: transparent; /* 背景透明 */
      padding: 8px; /* 调整内边距 */
    }

    option {
      color: white;
    }

    .active {
      font-size: 14px;
      font-family: '华文中宋', serif;
      color: #ed0b38;
    }
  }

  .tips{
    float: right;
    line-height: 40px;
    font-size: 13px;
    color: #9e9b9b;
    margin-right: 10px;

    span{
      color: black;
      font-size: 14px;
      font-family: '华文中宋', serif;
      margin-right: 5px;
    }
  }


}

.books {
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  .book-card {
    border-bottom: 1px solid #ddd;
    border-radius: 5px;
    padding-bottom: 18px;
    width: 800px;
    height: 170px;
    position: relative;

    .img {

      .book-cover {
        position: absolute;
        top: 10px;
        height: 150px;
        width: 110px;
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
      top: 38px;
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
      top: 62px;
      font-family: '', serif;
      font-size: 15px;
      line-height: 25px;
      display: -webkit-box; /* 创建弹性盒子布局 */
      -webkit-box-orient: vertical; /* 设置盒子垂直布局方向 */
      overflow: hidden; /* 隐藏超出部分 */
      text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
      -webkit-line-clamp: 2;
    }

    .chapters {
      position: absolute;
      left: 130px;
      top: 130px;
      font-size: 12px;
      color: #016498;
    }

    .time {
      position: absolute;
      left: 350px;
      top: 130px;
      font-size: 12px;
      color: #016498;
    }

    .wordCount{
      position: absolute;
      right: 20px;
      top: 4px;
      font-size: 13px;
      color: #7c7b7b;

      span{
        color: black;
        font-size: 14px;
        font-family: '华文中宋', serif;
      }
    }

    .recommended{
      position: absolute;
      right: 20px;
      top: 25px;
      font-size: 13px;
      color: #7c7b7b;

      span{
        color: #d32f2f;
        font-size: 14px;
        font-family: '华文中宋', serif;
      }
    }

    .button {
      position: absolute;
      left: 580px;
      top: 130px;
    }

    .bookshelf {
      left: 680px;
    }
  }
}
</style>
