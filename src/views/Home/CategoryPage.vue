<script setup>
import { ref } from 'vue'
import ComAffix from '@/components/ComAffix.vue'
import RankList from '@/components/RankList.vue'
import router from '@/router/index.js'
import { useCategoryStore} from '@/stores/index.js'
const categoryStore = useCategoryStore()
const props = defineProps({
  id: {
    type: Number
  }
})

const words = ref('')
const search = () =>{
  if(words.value==='')
    return
  const newRoute = router.resolve({ name: 'Search', params: { words: words.value } });
  window.open(newRoute.href, '_blank'); // '_blank' 表示在新标签页打开
  words.value = ''
}
const toBookDetail = (bookId) => {
  const newRoute = router.resolve({ name: 'BookDetail', params: { id: bookId }})
  window.open(newRoute.href, '_blank')
}

// 示例数据
const subCategories = categoryStore.getSubCategories(Number(props.id))
const category = categoryStore.getCategory(Number(props.id))

const weeklyBooksList = {
  title: '我们的世界姗姗来迟',
  author: '特',
}

const weeklyBooks = ref([
  weeklyBooksList,
  weeklyBooksList,
  weeklyBooksList,
  weeklyBooksList,
  weeklyBooksList,
  weeklyBooksList,
  weeklyBooksList,
  weeklyBooksList,
  weeklyBooksList,
  weeklyBooksList,
])

const weeklyTopBooksList = {
  name: '春归无觅处',
  author: '曙星照月',
  cover: 'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/6BE3035189D88AB5F7AADDE305A98AD0.jpg',
  description: '唯一一次改变灭族命运的机会',
}

const weeklyTopBooks = [
  weeklyTopBooksList,
  weeklyTopBooksList,
  weeklyTopBooksList,
  weeklyTopBooksList,
  weeklyTopBooksList,
]

const newBookFeaturedList = {
  name: '当我们谈论死亡时我们在谈论什么',
  description: '论心理治疗与无限月读的适配性',
}

const newBookFeatured = ref([
  newBookFeaturedList,
  newBookFeaturedList,
  newBookFeaturedList,
  newBookFeaturedList,
])

const newBooks = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: '新书' + i,
    author: '作者' + i,
    cover: 'https://via.placeholder.com/120',
    favorites: 100,
    description: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介' + i,
  })),
)

const sellingBooks = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: '我与他的七次相亲与一次相爱',
    author: 'electrotherapist',
    cover: 'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/9831E88FC28D31DEFA4B59A7F7D9F487.jpg',
    favorites: 100,
    description: '两位大龄男子为求真爱踏上漫漫征婚路，六次兜兜转转，一次他们成了',
  })),
)

const sellingRank = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i,
    name: '望断归去来',
    type: '衍生同人',
    author: '夕听风云',
  })),
)


const activeIndex = ref(0)
const sellingActiveIndex = ref(0)
const currentBook = ref(newBooks.value[activeIndex.value])
const sellingCurrentBook = ref(newBooks.value[activeIndex.value])
const handleCarouselChange = (index) => {
  // 更新当前的索引
  activeIndex.value = index
  currentBook.value = newBooks.value[activeIndex.value]
}
const sellingHandleCarouselChange = (index) => {
  // 更新当前的索引
  sellingActiveIndex.value = index
  sellingCurrentBook.value = sellingBooks.value[activeIndex.value]
}

const recentUpdates = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i,
    category: '「 '+'影视衍生'+' 」',
    title: '书名A',
    chapter: '章节A',
    author: '作者A',
    time: '2024-12-18 00:00:00',
  })),
)

const passRank = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: i,
    number: 10000,
    name: '望断归去来',
    type: '衍生同人',
    author: '夕听风云',
    cover: 'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/6BE3035189D88AB5F7AADDE305A98AD0.jpg'
  })),
)
const sellingImg = passRank.value[0].cover

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
</script>

<template>
  <div>
    <el-affix :offset="0">
      <ComAffix></ComAffix>
    </el-affix>
    <!-- 第一行：标题和搜索框 -->
    <div class="header w">
      <h1 class="main-title">{{category.name}}</h1>
      <div class="search">
        <input v-model="words" @keydown.enter="search" type="text" placeholder="搜索小说、作者" />
        <button @click="search">搜索</button>
      </div>
    </div>

    <!-- 第二行：二级分类和链接 -->
    <div class="sub-category w">
      <div class="categories">
        <span v-for="(cat, index) in subCategories" :key="index" class="category" style="cursor: pointer">
          <router-link :to="{ name: 'All', query: { categoryId: props.id, subCategoryId: cat.id } }"
          >{{ cat.name }}</router-link>
        </span>
        <span class="divider">|</span>
        <a href="#" class="link">{{category.name}}排行</a>
        <router-link class="link" :to="{ name: 'All', query: { categoryId: props.id,  status: 2 } }">{{category.name}}完本</router-link>
        <router-link class="link" :to="{ name: 'All', query: { categoryId: props.id,  attribute: 1 } }">{{category.name}}免费</router-link>
      </div>
    </div>

    <!-- 本周推荐 -->
    <div class="weekly-recommendation w">
      <div class="left">
        <span>本周推荐</span>
        <ul>
          <li v-for="book in weeklyBooks" :key="book.title">
            <router-link :to="{ name: 'BookDetail', params: { id: 1 } }"
              >{{ book.title }}
            </router-link>
            <span>{{ book.author }}</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="up">
          <div class="book-card" v-for="book in weeklyTopBooks" :key="book">
            <el-image :src="book.cover" alt="封面" class="img" />
            <span class="name"><router-link :to="{ name: 'BookDetail', params: { id: book.id } }"  target="_blank">
              {{ book.name }}
            </router-link>
            </span>
            <span class="description">{{ book.description }}</span>
          </div>
        </div>
        <el-divider />
        <div class="down">
          <span class="title"> 新书精选 </span>
          <div class="book" v-for="book in newBookFeatured" :key="book">
            <span class="name"><router-link :to="{ name: 'BookDetail', params: { id: book.id } }"  target="_blank">
              {{ book.name }}
            </router-link>
            </span>
            <span class="description">{{ book.description }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 频道新书 -->
    <div class="new-channel w channel">
      <div class="new-book">
        <span class="title">频道新书</span>
        <div class="new-channel-book">
          <div class="carousel">
            <el-carousel
              :interval="2000"
              type="card"
              height="140px"
              @change="handleCarouselChange"
              ref="carousel"
              indicator-position="none"
            >
              <el-carousel-item v-for="(book, index) in newBooks" :key="index">
                <el-image :src="book.cover" alt="封面" class="img" />
              </el-carousel-item>
            </el-carousel>
            <div class="book-info">
              <p class="title">{{ currentBook.title }}</p>
              <p class="author">{{ currentBook.author }}</p>
              <p class="likes">
                <span>{{ currentBook.favorites }}</span> 收藏
              </p>
              <p class="description">{{ currentBook.description }}</p>
              <el-button plain round color="#19bad8" @click="toBookDetail(currentBook.id)">书籍详情</el-button>
            </div>
          </div>
          <div class="grid">
            <div class="book-card" v-for="book in newBooks.slice(0, 6)" :key="book.title">
              <el-image :src="book.cover" alt="封面" class="img" />
              <p class="new-book-title"  @click="toBookDetail(book.id)" style="cursor: pointer">{{ book.title }}</p>
              <p class="description">{{ book.description }}</p>
              <el-avatar :size="18" :src="circleUrl" class="avatar" />
              <p class="author">{{ book.author }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="ranking">
        <RankList title="新书榜" name="newBook" type="1" :books="sellingRank" :img="sellingImg"></RankList>
      </div>
    </div>

    <!--  人气连载-->
    <div class="selling w channel">
      <div class="new-book">
        <span class="title">人气连载</span>
        <div class="new-channel-book">
          <div class="carousel">
            <el-carousel
              :interval="2000"
              type="card"
              height="140px"
              @change=" sellingHandleCarouselChange"
              ref="carousel"
              indicator-position="none"
            >
              <el-carousel-item v-for="(book, index) in sellingBooks" :key="index">
                <el-image :src="book.cover" alt="封面" class="img" />
              </el-carousel-item>
            </el-carousel>
            <div class="book-info">
              <p class="title">{{ sellingCurrentBook.title }}</p>
              <p class="author">{{ sellingCurrentBook.author }}</p>
              <p class="likes">
                <span>{{ sellingCurrentBook.favorites }}</span> 收藏
              </p>
              <p class="description">{{sellingCurrentBook.description }}</p>
              <el-button plain round color="#19bad8"  @click="toBookDetail(sellingCurrentBook.id)">书籍详情</el-button>
            </div>
          </div>
          <div class="grid">
            <div class="book-card" v-for="book in sellingBooks.slice(0, 6)" :key="book.title">
              <el-image :src="book.cover" alt="封面" class="img" />
              <p class="new-book-title"  @click="toBookDetail(book.id)" style="cursor: pointer">{{ book.title }}</p>
              <p class="description">{{ book.description }}</p>
              <el-avatar :size="20" :src="circleUrl" class="avatar" />
              <p class="author">{{ book.author }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="ranking">
        <!--      畅销榜(这个月得到的订阅点数排行)-->
        <div class="selling">
          <RankList title="畅销榜" name="selling" type="1" :books="sellingRank" :img="sellingImg"></RankList>
        </div>
      </div>
    </div>


    <!-- 最近更新 -->
    <div class="update-vote w">
      <div class="recent-updates">
        <span class="title">最近更新</span>
        <div class="table">
          <el-table :data="recentUpdates" style="width: 115%">
            <el-table-column prop="category" width="120" />
            <el-table-column prop="title" show-overflow-tooltip width="170" />
            <el-table-column prop="chapter" show-overflow-tooltip width="170"  />
            <el-table-column prop="author" show-overflow-tooltip width="100" />
            <el-table-column prop="time" width="170" />
          </el-table>
        </div>
      </div>
      <div class="pass">
        <RankList name="pass" title="月票榜" type="0" :books="passRank" :img="sellingImg"></RankList>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.w {
  width: 980px;
  margin: 0 auto;
}

.header {
  margin-top: 20px;

  .main-title {
    font-size: 40px;
    font-family: '华文行楷', serif;
    font-weight: 300;
    float: left;
    margin-left: 20px;
    margin-top: 35px;
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
}

.sub-category {
  margin-top: 150px;

  .categories {
    display: flex;
    gap: 18px;
    align-items: center;
    margin: 20px 0;

    a{
      text-decoration: none;
      color: black;
    }
  }

  .category {
    font-size: 14px;
    font-weight: bold;
  }

  .divider {
    color: #ccc;
  }

  .link {
    font-size: 14px;
    font-weight: bold;
    color: black;
    cursor: pointer;
    text-decoration: none;
  }
}

.weekly-recommendation {
  margin-top: 30px;

  .left {
    color: #ffffff;
    float: left;
    width: 230px;
    height: 380px;
    background-color: #7da3ac;
    padding-top: 20px;

    span {
      margin-left: 20px;
      font-family: '黑体', serif;
      font-size: 23px;
    }

    ul {
      margin-left: -20px;
    }

    li {
      list-style: none;
      border-bottom: 1px solid #bdbbbb;
      margin: 5px 0;
      padding-bottom: 5px;
      position: relative;

      a {
        display: inline-block;
        font-weight: 400;
        font-size: 14px;
        text-decoration: none;
        color: #ffffff;
        font-family: '华文中宋', serif;
        max-width: 140px;
        overflow: hidden; /* 隐藏超出部分 */
        white-space: nowrap; /* 不换行 */
        text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
      }

      span {
        position: absolute;
        top: 2px;
        right: 10px;
        font-weight: 400;
        font-size: 14px;
        text-decoration: none;
        color: #ffffff;
        font-family: '仿宋', serif;

        max-width: 70px;
        overflow: hidden; /* 隐藏超出部分 */
        white-space: nowrap; /* 不换行 */
        text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
      }
    }
  }

  .right {
    float: left;
    width: 720px;
    height: 400px;
    border: 1px solid #cdcccc;
    margin-left: 20px;

    .up {
      margin-top: 20px;
      height: 240px;

      .book-card {
        height: 240px;
        width: 120px;
        margin-left: 20px;
        float: left;

        .img {
          width: 115px;
          height: 150px;
          border: 1px solid #c3c1c1;
        }

        .name {
          display: inline-block;
          font-size: 16px;
          font-weight: bold;
          margin: 15px 20px 10px;
          max-width: 100px;
          overflow: hidden; /* 隐藏超出部分 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis; /* 使用省略号表示溢出部分 */

          a{
            text-decoration: none;
            color: black;
          }
        }

        .description {
          color: #666;
          font-size: 14px;
          display: -webkit-box; /* 创建弹性盒子布局 */
          -webkit-box-orient: vertical; /* 设置盒子垂直布局方向 */
          overflow: hidden; /* 隐藏超出部分 */
          text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
          -webkit-line-clamp: 2;
        }
      }
    }

    .down {
      margin-top: -20px;

      .title {
        float: left;
        display: block;
        margin: 20px 30px;
        width: 38px;
        height: 48px;
        opacity: 0.7;
        background-color: #ed0b38;
        color: #f7f7f7;
        border-radius: 8px;
        padding: 5px 10px;
        font-size: 18px;
        font-family: '华文中宋', serif;
      }

      .book {
        float: left;
        height: 50px;
        width: 300px;
        font-size: 14px;
        font-family: '华文中宋', serif;

        .name {
          margin-top: 10px;
          margin-bottom: 5px;
          display: inline-block;
          width: 300px;

          a{
            text-decoration: none;
            color: black;
          }
          a:hover{
            color: #ed0b38;
          }
        }

        .description {
          display: inline-block;
          color: #878585;
          font-size: 13px;
          width: 250px;
          overflow: hidden; /* 隐藏超出部分 */
          white-space: nowrap; /* 不换行 */
          text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
        }
      }
    }
  }
}

.channel{
   height: 500px;
  .new-book {
    float: left;
    width: 750px;

    .title {
      font-size: 22px;
      font-family: '华文中宋', serif;
      margin-left: 10px;
    }

    .new-channel-book {
      border-top: 1px solid #686868;
      margin-top: 5px;
      padding-top: 20px;

      .carousel {
        float: left;
        width: 200px;
        height: 380px;
        padding: 20px 20px;
        background-color: #e3f9fd;

        .img {
          height: 135px;
          width: 100px;
        }

        .book-info {
          display: flex;
          flex-direction: column; /* 垂直排列 */
          justify-content: center; /* 垂直方向居中 */
          align-items: center; /* 水平方向居中 */
          text-align: center; /* 使文本内容居中 */
          height: 100%; /* 使容器填满父容器的高度 */
        }

        .book-info .title,
        .book-info .author,
        .book-info .likes,
        .book-info .description {
          margin: 10px 0; /* 为每个元素添加一些间距 */
        }

        .book-info {
          margin-top: 10px;
          width: 200px;
          align-content: center;

          .title {
            margin-top: -170px;
            font-size: 22px;
            font-family: '黑体', serif;
            font-weight: bold;

          }

          .author {
            font-size: 15px;
            margin-top: -5px;
            font-family: '华文仿宋', serif;
            color: #ed0b38;
          }

          .likes {
            margin-top: -5px;

            span {
              font-size: 20px;
              color: #ed0b38;
            }
          }

          .description {
            color: #6c6b6b;
            font-size: 14px;
            margin-bottom: 20px;
            display: -webkit-box; /* 创建弹性盒子布局 */
            -webkit-box-orient: vertical; /* 设置盒子垂直布局方向 */
            overflow: hidden; /* 隐藏超出部分 */
            text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
            -webkit-line-clamp: 3;
          }
        }

        .el-carousel__item h3 {
          display: none;
          color: #475669;
          opacity: 0.75;
          line-height: 200px;
          margin: 0;
          text-align: center;
        }
      }

      .grid {
        float: left;
        width: 500px;
        padding-left: 10px;
        margin-top: -10px;
        .book-card {
          position: relative;
          width: 240px;
          height: 140px;
          border-bottom: 1px solid #bdbdbd;
          float: left;

          .img {
            position: absolute;
            left: 10px;
            top: 20px;
            height: 100px;
            width: 80px;
          }

          .new-book-title {
            position: absolute;
            left: 105px;
            top: 5px;
            font-size: 16px;
            font-weight: bold;
            max-width: 140px;
            overflow: hidden; /* 隐藏超出部分 */
            white-space: nowrap; /* 不换行 */
            text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
          }

          .description {
            position: absolute;
            left: 105px;
            top: 35px;
            font-family: '华文中宋', serif;
            font-size: 12px;
            color: #575656;
            max-width: 120px;
            display: -webkit-box; /* 创建弹性盒子布局 */
            -webkit-box-orient: vertical; /* 设置盒子垂直布局方向 */
            overflow: hidden; /* 隐藏超出部分 */
            text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
            -webkit-line-clamp: 3;
          }

          .avatar {
            position: absolute;
            left: 105px;
            top: 100px;
          }

          .author {
            position: absolute;
            font-family: '华文中宋', serif;
            font-size: 13px;
            color: #818181;
            left: 135px;
            top: 87px;
          }
        }
      }
    }
  }

  .rank {
    float: right;
    margin-top: 4px;
  }
}
.new-channel{
  margin-top: 470px;
}

.selling{
  margin-top: 20px;
}

.update-vote{
  margin-top: 30px;
  .recent-updates{
    float: left;
    width: 740px;
    margin-right: 10px;
    .title{
      font-size: 22px;
      font-family: '华文中宋', serif;
      margin-left: 10px;
    }

    .table{
      border-top: 1px solid #6c6b6b;
      padding-top: 25px;
    }
  }
  .pass{
    float: left;
  }
}
</style>
