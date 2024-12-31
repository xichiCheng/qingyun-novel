<script setup>
import { reactive } from 'vue'
import { ref } from 'vue'
import { computed } from 'vue'
import ComAffix from '@/components/ComAffix.vue'
import { ArrowDownBold, ArrowRight, ArrowUpBold, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/index.js'
import { useCategoryStore } from '@/stores/index.js'
// 获取路由实例
const router = useRouter()
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const props = defineProps({
  id: {
    type: String,
  },
})
console.log(props.id)
// 示例数据
const novel = reactive({
  id: 1,
  cover_url:
    'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/64F862A28B12F6D181DD8BC68594ED76.jpg',
  name: '天命兴汉',
  author: '微兮凉',
  categoryId: 1,
  subcategoryId: 6,
  status: 1,
  attribute:2,
  wordCount: '101万',
  recommendCount: '51341',
  favoriteCount: '32201',
  profile:
    '刘棠穿越到了276年的大汉，等等，276年?\n' +
    '\n' +
    '“后汉自桓、灵以下，天地纵横，巨猾窃命，刘氏旧泽犹存，而瞻乌之望殆绝。烈祖以圣德灵威，龙兴凤举，将散乱之兵，破百万之陈，摧九虎之军，雷震四海，席卷天下，攘除祸乱，诛灭无道，数年之间，廓清四海，虽曰中兴，与夫始创业者，庸有异乎？”\n' +
    '                    —《后汉书卷十·烈祖昭武帝纪》\n' +
    '\n' +
    '宣宗昭文皇帝讳棠，孝仁帝第八女也 ，母曰文懿皇后赵氏，生于景和十七年九月甘七，是日，雒阳之海棠千树，竞相吐艳，冀州久旱，终逢霖雨，田野沐泽，仁帝甚奇之，乃封之南阳。\n' +
    '帝幼禀慧根，六岁能属文，经籍典故，皆诵之如流，无有滞碍。曾献《江月赋》于仁帝，仁帝大说，乃曰：“建安之文风，犹存于今也。”\n' +
    '                   —《后汉书卷十五·宣宗昭文帝纪》\n' +
    '\n' +
    '圣人功德，如日月经天，江河行地，当万世不朽。\n' +
    '                   —《熙平政要》\n' +
    '这是两个穿越者接力延续大汉国祚的故事\n' +
    '\n' +
    '(历史背景很杂，有两汉的郡县制，北魏的均田制，隋唐的科举制和官制，:-D，总之是社会生产力的进步，虽是大汉!)',
  tag: ['女强', '励志'],
})

const author = reactive({
  name: '微兮凉',
  avatar:
    'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/B3385A0504DC9F2E1CFF413F1091B7F4.jpg',
  totalWorks: '5',
  totalWords: '500万',
})

// 功能方法
const addToBookshelf = () => {
  if(userStore.token==='')
    router.push('/login')
}

const chapters = reactive({
  total: 100,
  list: Array.from({ length: 100 }, (_, i) => ({
    number: i + 1,
    title: `章节标题${i + 1}`,
    isPaid: i >= 10, // 前 20 章免费，之后为付费章节
  })),
})

const showAllChapters = ref(false)

const displayedChapters = computed(() => {
  return showAllChapters.value ? chapters.list : chapters.list.slice(0, 15)
})

const toggleShowAllChapters = () => {
  showAllChapters.value = !showAllChapters.value
}

const comments = ref({
  list: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    username: `用户${i + 1}`,
    avatar: '/path/to/user-avatar.jpg',
    content: `这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。这是第 ${i + 1} 条评论内容。`,
    likes: Math.floor(Math.random() * 100),
  })),
})
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const goToBookContent = (bookId, chapterId) => {
  router.push({ name: 'BookContent', params: { bookId, chapterId } })
}
</script>

<template>
  <div>
    <el-affix :offset="0">
      <ComAffix></ComAffix>
    </el-affix>
    <div class="novel-details w">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'Category', params: { id: novel.categoryId} }" target="_blank">
          {{categoryStore.getCategory(novel.categoryId).name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ name: 'All', query: { categoryId: novel.categoryId, subCategoryId: novel.subcategoryId } }"
        >{{categoryStore.getSubCategory(novel.categoryId,novel.subcategoryId).name}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ novel.name }}</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 小说详情卡片 -->
      <el-card class="novel-card">
        <div class="novel-content">
          <!-- 小说封面 -->
          <img class="novel-cover" :src="novel.cover_url" alt="小说封面" />

          <!-- 小说信息 -->
          <div class="novel-info">
            <h1 class="name">{{ novel.name }}</h1>
            <p class="author">作者: {{ novel.author }}</p>
            <p class="category">
              {{novel.status===1 ? '连载中' : '已完结'}} ·
              {{novel.attribute===1 ? '免费' : 'VIP'}} ·
              {{categoryStore.getCategory(novel.categoryId).name}} ·
              {{categoryStore.getSubCategory(novel.categoryId,novel.subcategoryId).name}}</p>
            <p class="info">
              <span> {{ novel.wordCount }}</span> 字 &nbsp;&nbsp;&nbsp;&nbsp;<span>{{
                novel.recommendCount
              }}</span>
              推荐 &nbsp;&nbsp;&nbsp;&nbsp;<span>{{ novel.favoriteCount }} </span> 收藏
            </p>
            <div class="actions">
              <el-button round plain color="#19bad8" @click="addToBookshelf" class="bookshelf" :disabled="userStore.getBookById(Number(props.id))"
                >{{ userStore.getBookById(Number(props.id)) ? '已在书架' : '加入书架' }}
              </el-button>
              <el-button
                round
                plain
                color="#19bad8"
                class="content"
                @click="goToBookContent(props.id, 1)"
                >开始阅读
              </el-button>
            </div>
          </div>
          <!-- 作者信息 -->
          <div class="author-info">
            <el-avatar :src="author.avatar" :size="120"></el-avatar>
            <p class="name">{{ author.name }}</p>
            <div class="info">
              <span class="total_work">作品总数</span
              ><span class="work_num">
                <svg class="icon chapterIcon" aria-hidden="true">
                  <use xlink:href="#icon-maisuizuo"></use></svg
                >{{ author.totalWorks
                }}<svg class="icon chapterIcon" aria-hidden="true">
                  <use xlink:href="#icon-maisuiyou"></use>
                </svg>
              </span>
              <span class="total_word">累计字数</span
              ><span class="word_num">{{ author.totalWords }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="introduced w">
      <el-card class="introduced-card">
        <template #header>
          <span class="title"> 作品简介 </span>
        </template>
        <pre class="profile">{{ novel.profile }}</pre>
        <div class="novel-tag">
          <el-tag v-for="item in novel.tag" :key="item" round class="tag">{{ item }}</el-tag>
        </div>
      </el-card>
    </div>

    <div class="catalog w">
      <el-card class="catalog-card">
        <template #header>
          <span class="title">目录</span> <span class="total_num">总共{{ chapters.total }}章</span>
        </template>
        <div class="catalog-list">
          <span v-for="(chapter, index) in displayedChapters" :key="index" class="catalog-item">
            <span  @click="goToBookContent(props.id,chapter.number)" style="cursor: pointer">第{{ chapter.number }}章 &nbsp;{{ chapter.title }}</span>
            <i v-if="chapter.isPaid">
              <el-icon color="#aeacac"><Lock /></el-icon>
            </i>
          </span>
        </div>

        <template #footer>
          <el-icon v-if="!showAllChapters" @click="toggleShowAllChapters" class="expand-icon">
            <ArrowDownBold />
          </el-icon>
          <el-icon v-if="showAllChapters" @click="toggleShowAllChapters" class="expand-icon">
            <ArrowUpBold />
          </el-icon>
        </template>
      </el-card>
    </div>

    <div class="comment w">
      <el-card class="comments-card">
        <template #header>
          <span class="title">评论区</span>
          <router-link class="comments-link" :to="{ name: 'Comment', query: { bookId: props.id, bookName: novel.name } }" target="_blank">
            全部评论&nbsp;
            <el-icon class="icon">
                <ArrowRight />
            </el-icon>
          </router-link>
        </template>
        <div
          class="comment-item"
          v-for="(comment, index) in comments.list.slice(0, 3)"
          :key="index"
        >
          <div class="comment-header">
            <el-avatar :src="circleUrl" size="30"></el-avatar>
            <span class="comment-user">{{ comment.username }}</span>
            <span class="time">2024-12-17</span>
          </div>
          <p class="comment-content">{{ comment.content }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.w {
  width: 900px;
  margin: 0 auto;
}

.novel-details {
  padding: 20px;

  .breadcrumb {
    margin-bottom: 20px;
  }

  .novel-card {
    padding: 20px;
    height: 270px;
  }

  .novel-content {
    display: flex;
    gap: 20px;
  }

  .novel-cover {
    width: 170px;
    height: 240px;
    object-fit: cover;
    margin-right: 10px;
  }

  .novel-info {
    flex: 2;

    .name {
      margin-top: 5px;
    }

    .author {
      font-size: 15px;
      font-weight: bold;
      color: #aeacac;
    }

    .category {
      font-weight: bold;
      font-size: 16px;
    }

    .info {
      margin-top: 25px;
      font-weight: bold;
      font-size: 15px;
      color: #706e6e;

      span {
        font-size: 20px;
        color: black;
        font-weight: normal;
        font-family: '微软雅黑', serif;
      }
    }

    .actions {
      margin-top: 20px;
    }

    .bookshelf {
      margin-right: 5px;
    }
  }

  .author-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-left: 1px dashed #dcd7d7;
    padding-left: 60px;
    padding-right: 20px;

    .name {
      font-size: 20px;
      font-weight: bold;
    }

    .info {
      position: relative;
      width: 150px;
      height: 60px;
      font-size: 14px;
      margin-top: -5px;
      margin-left: 10px;

      .chapterIcon {
        height: 20px;
        width: 20px;
      }

      .total_work {
        position: absolute;
        color: #aeacac;
      }

      .work_num {
        position: absolute;
        top: 26px;
        left: 2px;
        font-size: 18px;
      }

      .total_word {
        position: absolute;
        color: #aeacac;
        left: 85px;
      }

      .word_num {
        position: absolute;
        left: 88px;
        top: 26px;
        font-size: 18px;
      }
    }
  }
}

.introduced {
  margin-top: 20px;

  .introduced-card {
    .title {
      margin-left: 30px;
      margin-top: 15px;
      font-size: 25px;
      font-weight: bold;
    }

    .profile {
      margin-left: 30px;
      width: 800px;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-size: 15px;
      font-family: '黑体', serif;
    }

    .novel-tag {
      margin-left: 30px;
      margin-top: 15px;

      .tag {
        margin-right: 10px;
      }
    }
  }
}

.catalog {
  margin-top: 40px;

  .title {
    margin-left: 30px;
    margin-top: 15px;
    font-size: 25px;
    font-weight: bold;
  }

  .total_num {
    font-weight: bold;
    color: #6c6b6b;
  }

  .catalog-list {
    margin-left: 30px;
  }

  .catalog-item {
    display: inline-block;
    width: 270px;
    height: 40px;

    span {
      display: inline-block;
      width: 220px;
      overflow: hidden; /* 隐藏超出部分 */
      white-space: nowrap; /* 不换行 */
      text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
    }
  }

  .expand-icon {
    margin-left: 400px;
  }
}

.comment {
  margin-top: 40px;

  .title {
    margin-left: 30px;
    margin-top: 15px;
    font-size: 25px;
    font-weight: bold;
  }

  a{
    color: black;
    text-decoration: none;
  }

  a:hover {
    color: #ed0b38;
  }
  .comments-link {
    margin-left: 600px;
    font-size: 18px;
  }

  .comment-item {
    padding: 0 30px;
    border-bottom: 1px solid #dcd7d7;

    .comment-header {
      margin-top: 20px;
      position: relative;

      .comment-user {
        position: absolute;
        top: 11px;
        left: 50px;
      }

      .time {
        position: absolute;
        top: 11px;
        right: 30px;
      }
    }

    .comment-content {
      margin-bottom: 20px;
    }
  }
}
</style>
