<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import ComShortcut from '@/components/ComShortcut.vue'
import ComAffix from '@/components/ComAffix.vue'
import ComHeader from '@/components/ComHeader.vue'
import { CaretBottom, CaretTop } from '@element-plus/icons-vue'

const selectedCategory = ref('')
const searchQuery = ref('')
const sortOrder = ref('')
const referralTicket = ref('weekly')

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const handleSortChange = () => {
  sortOrder.value = referralTicket.value // 当选择推荐票时，设置当前排序为推荐票
  console.log(sortOrder.value)
}

const params = ref({
  category: 0, // 主分类
  subCategory: 0, // 子分类
  status: '', // 状态
  attribute: '', // 属性
  wordRange: '', // 字数范围
  tags: [], // 标签数组
  pageNum: 1, // 当前页码
  pageSize: 10, // 每页条数
})
const total = ref(0)
//处理分页
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
}
const onCurrentChange = (currentPage) => {
  params.value.pagenum = currentPage
}

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

const subcategories = ref({
  0: [], // 默认空分类
  1: [
    { id: 1, name: '古代情缘' },
    { id: 2, name: '宫闱宅斗' },
    { id: 3, name: '经商种田' },
    { id: 4, name: '古典架空' },
    { id: 5, name: '女尊王朝' },
    { id: 6, name: '穿越奇情' },
    { id: 7, name: '西方时空' },
    { id: 8, name: '清穿民国' },
    { id: 9, name: '上古蛮荒' },
  ],
  2: [
    { id: 21, name: '修仙' },
    { id: 22, name: '仙侠奇幻' },
  ],
})

const cursubcategorie = ref(0) // 默认值为 0

// 更新分类
const setCategory = (category) => {
  params.value.category = category.id
  cursubcategorie.value = category.id
}

const books = ref([])
const filteredBooks = computed(() => {
  return books.value.filter((book) => {
    const matchesQuery =
      book.title.includes(searchQuery.value) || book.author.includes(searchQuery.value)
    const matchesCategory = !selectedCategory.value || book.category === selectedCategory.value
    return matchesQuery && matchesCategory
  })
})

books.value = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  title: '诡秘之主',
  author: '爱潜水的乌贼',
  wordCount: 4465000,
  category: '玄幻',
  secondary_category: '异世大陆',
  cover:
    'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/fad8729e2f729578cb5d3bed2c1d6c37.jpeg',
  status: 'complet',
  profile:
    '蒸汽与机械的浪潮中，谁能触及非凡？历史和黑暗的迷雾里，又是谁在耳语？我从诡秘中醒来，睁眼看见这个世界:枪械，大炮，巨舰，飞空艇，差分机；魔药，占卜，诅咒，倒吊人，封印物……光明依旧照耀，神秘从未远离，这是一段“愚者”的传说。',
  collection: 9679999,
}))

function formatNumberToWan(number) {
  return (number / 10000).toFixed(2)
}

books.value = books.value.map((book) => ({
  ...book,
  wordCount: formatNumberToWan(book.wordCount),
  collection: formatNumberToWan(book.collection),
}))

const words = ref([
  { id: 0, range: '30万字以下' },
  { id: 1, range: '30万-50万字' },
  { id: 2, range: '50万-100万字' },
  {
    id: 3,
    range: '100万字-200万字',
  },
  { id: 4, range: '200万字以上' },
])

const tags = ref([
  { id: 1, name: '总裁' },
  { id: 2, name: '作精' },
  { id: 3, name: '大佬' },
  { id: 4, name: '大小姐' },
  { id: 5, name: '游戏主播' },
  { id: 6, name: '神探' },
  { id: 7, name: '将军' },
  { id: 8, name: '毒医' },
  { id: 9, name: '厨娘' },
  { id: 10, name: '律师' },
  { id: 11, name: '医生' },
  { id: 12, name: '明星' },
  { id: 13, name: '替身' },
  { id: 14, name: '双面' },
  { id: 15, name: '冰山' },
  { id: 16, name: '古灵精怪' },
  { id: 17, name: '天作之合' },
  { id: 18, name: '可盐可甜' },
  { id: 19, name: '无CP' },
  { id: 20, name: '病娇' },
  { id: 21, name: '反派' },
  { id: 22, name: '萌宝' },
  { id: 23, name: '宠妻' },
  { id: 24, name: '学霸' },
  { id: 25, name: '公主' },
  { id: 26, name: '皇后' },
  { id: 27, name: '王妃' },
  { id: 28, name: '女强' },
  { id: 29, name: '皇叔' },
  { id: 30, name: '嫡女' },
  { id: 31, name: '精灵' },
  { id: 32, name: '天才' },
  { id: 33, name: '腹黑' },
  { id: 34, name: '扮猪吃虎' },
  { id: 35, name: '团宠' },
  { id: 36, name: '科幻末世' },
  { id: 37, name: '女频衍生' },
  { id: 38, name: '民国言情' },
  { id: 39, name: '悬疑脑洞' },
  { id: 40, name: '抗战谍战' },
  { id: 41, name: '青春甜宠' },
  { id: 42, name: '悬疑恋爱' },
  { id: 43, name: '双男主' },
  { id: 44, name: '古言脑洞' },
  { id: 45, name: '现言脑洞' },
  { id: 46, name: '玄幻言情' },
  { id: 47, name: '宫斗宅斗' },
  { id: 48, name: '豪门总裁' },
  { id: 49, name: '动漫衍生' },
  { id: 50, name: '星光璀璨' },
  { id: 51, name: '游戏体育' },
  { id: 52, name: '职场婚恋' },
  { id: 53, name: '双女主' },
  { id: 54, name: '医术' },
  { id: 55, name: '年代' },
  { id: 56, name: '种田' },
  { id: 57, name: '快穿' },
  { id: 65, name: '四合院' },
  { id: 66, name: '电竞' },
  { id: 67, name: '双重生' },
  { id: 68, name: '前世今生' },
  { id: 69, name: '乡村' },
  { id: 70, name: '逃荒' },
  { id: 71, name: '同人' },
  { id: 72, name: '打脸' },
  { id: 73, name: '破案' },
  { id: 74, name: '囤物资' },
  { id: 75, name: '钓鱼' },
  { id: 76, name: 'HE' },
  { id: 77, name: '相爱相杀' },
  { id: 78, name: '暗恋' },
  { id: 79, name: '逃婚' },
  { id: 80, name: '带球跑' },
  { id: 81, name: '强强' },
  { id: 82, name: '一见钟情' },
  { id: 83, name: '双向奔赴' },
  { id: 84, name: '破镜重圆' },
  { id: 85, name: '契约婚姻' },
  { id: 86, name: '隐婚' },
  { id: 87, name: '闪婚' },
  { id: 88, name: '今穿古' },
  { id: 89, name: '古穿今' },
  { id: 90, name: '群穿' },
  { id: 91, name: '护短' },
  { id: 92, name: '虐渣' },
  { id: 93, name: '情有独钟' },
  { id: 94, name: '马甲' },
  { id: 95, name: '女扮男装' },
  { id: 96, name: '青梅竹马' },
  { id: 97, name: '无敌' },
  { id: 98, name: '民国' },
  { id: 99, name: '穿书' },
  { id: 100, name: '职场' },
  { id: 101, name: '家庭' },
  { id: 102, name: '末世' },
  { id: 103, name: '直播' },
  { id: 104, name: '兽世' },
  { id: 105, name: '清穿' },
  { id: 106, name: '星际' },
  { id: 107, name: '美食' },
  { id: 108, name: '盗墓' },
  { id: 109, name: '虐文' },
  { id: 110, name: '甜宠' },
  { id: 111, name: '灵异' },
  { id: 112, name: '校园' },
  { id: 113, name: '系统' },
  { id: 114, name: '重生' },
  { id: 115, name: '穿越' },
  { id: 116, name: '二次元' },
  { id: 117, name: '娱乐圈' },
  { id: 118, name: '空间' },
  { id: 119, name: '推理' },
])

// 展开状态
const expanded = ref(false)

// 用户选择的标签数组
const selectedTags = ref([])

// 可见标签（前10个或全部）
const visibleTags = computed(() => (expanded.value ? tags.value : tags.value.slice(0, 11)))
// 切换展开/关闭状态
const toggleExpand = () => {
  expanded.value = !expanded.value
}
// 切换标签选择状态
const toggleTag = (tagId) => {
  const index = selectedTags.value.indexOf(tagId)
  if (selectedTags.value.length === 3) {
    if (!selectedTags.value.includes(tagId)) {
      return
    }
  }

  if (index === -1) {
    // 如果未选中，则添加
    selectedTags.value.push(tagId)
  } else {
    // 如果已选中，则移除
    selectedTags.value.splice(index, 1)
  }
  console.log(selectedTags)
}

//固定
const showAffix = ref(false)
const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  // 滑动到 200px 显示 Affix
  showAffix.value = scrollTop > 200
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <ComShortcut></ComShortcut>
    <ComHeader></ComHeader>
    <el-affix v-if="showAffix" :offset="0" class="affix-container">
      <ComAffix></ComAffix>
    </el-affix>
    <div class="content w">
      <div class="classify">
        <!-- 分类筛选区域 -->
        <div class="filter-category">
          <span class="title">分类</span>
          <div class="categories">
            <span class="category-item" @click="setCategory(0)">全部</span>
            <span
              v-for="category in categories"
              :key="category.id"
              class="category-item"
              @click="setCategory(category)"
            >
              {{ category.name }}
            </span>
          </div>
          <div class="subcategories">
            <span
              v-for="sub in subcategories[cursubcategorie]"
              :key="sub.id"
              class="subcategory-item"
            >
              {{ sub.name }}
            </span>
          </div>
        </div>
        <div class="filter-status">
          <span class="title">状态：</span>
          <div class="status">
            <el-radio-group v-model="params.status">
              <el-radio-button :label="''"><span>全部</span></el-radio-button>
              <el-radio-button :label="'ongoing'"><span>连载中</span></el-radio-button>
              <el-radio-button :label="'completed'"><span>已完结</span></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="filter-attribute">
          <span class="title">属性：</span>
          <div class="status">
            <el-radio-group v-model="params.attribute">
              <el-radio-button :label="''"><span>全部</span></el-radio-button>
              <el-radio-button :label="'ongoing'"><span>免费</span></el-radio-button>
              <el-radio-button :label="'completed'"><span>VIP</span></el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="filter-words">
          <span class="title">字数：</span>
          <div class="words">
            <span class="word-item">全部</span>
            <span v-for="word in words" :key="word.id" class="word-item">
              {{ word.range }}
            </span>
          </div>
        </div>
        <div class="filter-tag">
          <span class="title">标签：</span>
          <el-button
            v-if="!expanded"
            class="more"
            @click="toggleExpand"
            round
            :icon="CaretBottom"
            color="#19bad8"
            :size="'small'"
            plain
          >展开
          </el-button>
          <el-button
            v-if="expanded"
            class="more"
            @click="toggleExpand"
            round
            :icon="CaretTop"
            color="#19bad8"
            :size="'small'"
            plain
          >收起
          </el-button>
          <div class="tags">
            <span
              v-for="tag in visibleTags"
              :key="tag.id"
              :class="['tag-item', { selected: selectedTags.includes(tag.id) }]"
            >
              <el-check-tag
                style="font-weight: normal; font-size: 12px; padding: 5px 9px"
                effect="plain"
                @click="toggleTag(tag.id)"
                :checked="selectedTags.includes(tag.id)"
              >{{ tag.name }}</el-check-tag
              >
            </span>
            <el-button
              v-if="expanded"
              class="more"
              @click="toggleExpand"
              round
              :icon="CaretTop"
              color="#19bad8"
              :size="'small'"
              plain
            >收起
            </el-button>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="sort">
          <span :class="{ active: sortOrder === 'popularity' }" @click="sortOrder = 'popularity'">
            人气排序
          </span>
          <span
            :class="{ active: sortOrder === 'totalFavorites' }"
            @click="sortOrder = 'totalFavorites'"
          >
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
        <div class="book-list">
          <!-- 小说列表 -->
          <div class="book-card" v-for="book in filteredBooks" :key="book.id">
            <img :src="book.cover" alt="书籍封面" class="book-cover" />
            <p class="name">{{ book.title }}</p>
            <p class="author">
              <el-avatar :size="12" :src="circleUrl" />
              {{ book.author }} | {{ book.category }}·{{ book.secondary_category }} |
              {{ book.status === 'completed' ? '完结' : '连载中' }}
            </p>
            <p class="profile">{{ book.profile }}</p>
            <p class="words">{{ book.wordCount }}万字 &nbsp;&nbsp;&nbsp;·</p>
            <p class="collection">{{ book.collection }}万总收藏</p>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            v-model:current-page="params.pageNum"
            v-model:page-size="params.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes,prev, pager, next, jumper"
            background
            :total="total"
            @size-change="onSizeChange"
            @current-change="onCurrentChange"
            style="margin-top: 20px; justify-content: flex-end"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.w {
  width: 1030px;
  margin: 0 auto;
}

.content {
  margin-top: 140px;
}

.classify {
  float: left;
  width: 230px;
  margin-right: 10px;

  .title {
    font-size: 18px;
    margin-left: 3px;
    font-family: '华文中宋', serif;
  }

  .filter-category {
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;

    .categories {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;

      .category-item {
        padding: 5px 5px;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        font-size: 13px;
      }

      .category-item:hover {
        background-color: #f5f5f5;
      }

    }

    .subcategories {
      margin-top: 10px;
      background-color: #f5f5f5;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
    }

    .subcategory-item {
      padding: 6px 3px;
      text-align: center;
      cursor: pointer;
      font-size: 13px;
    }

  }

  .filter-status {
    margin-top: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid #cccccc;

    .status {
      margin-top: 15px;

      span {
        font-size: 13px;
      }
    }
  }

  .filter-attribute {
    margin-top: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid #cccccc;

    .status {
      margin-top: 15px;

      span {
        font-size: 13px;
      }
    }
  }

  .filter-words {
    margin-top: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid #cccccc;

    .words {
      margin-top: 10px;

      .word-item {
        display: inline-block;
        width: 115px;
        height: 30px;
        font-size: 13px;
        line-height: 30px;
        text-align: center;
      }

      .word-item:hover {
        background-color: #f5f5f5;
        border-radius: 8px;
      }
    }
  }

  .filter-tag {
    margin-top: 10px;
    margin-bottom: 40px;

    .more {
      margin-left: 80px;
    }

    .tags {
      margin-top: 10px;

      span {
        margin: 4px;
      }

      .more {
        margin-left: 135px;
      }
    }
  }
}

.list {
  float: left;
  width: 790px;

  .sort {
    height: 40px;
    margin-bottom: 10px;
    background-color: #eefcff;

    span {
      line-height: 40px;
      margin: 0 15px;
      font-size: 15px;
      font-family: '华文中宋', serif;
    }

    .referral-ticket {
      font-size: 15px;
      font-family: '华文中宋', serif;
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
      color: #ed0b38;
    }
  }

  .book-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .book-card {
      border-bottom: 1px solid #ddd;
      border-radius: 5px;
      padding: 10px;
      width: 365px;
      height: 155px;
      position: relative;

      .book-cover {
        position: absolute;
        top: 10px;
        height: 135px;
        width: 100px;
        border: 1px solid #ddd;
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

      .words {
        position: absolute;
        left: 130px;
        top: 115px;
        font-size: 13px;
        color: #888787;
      }

      .collection {
        position: absolute;
        left: 234px;
        top: 115px;
        font-size: 13px;
        color: #c6012a;
      }
    }
  }

  .pagination{
    margin-bottom: 30px;
  }
}

</style>
