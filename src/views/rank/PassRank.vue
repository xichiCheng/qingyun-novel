<script setup>
import { ref } from 'vue'
import RankBooks from '@/views/rank/components/RankBooks.vue'

const years = ref([2024, 2023, 2022]) // 可扩展年份
const months = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) // 月份范围
const year = ref(null) // 当前选择的年份
const month = ref(null) // 当前选择的月份

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
const rankBook = ref(
  Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: '诡秘之主',
    author: '爱潜水的乌贼',
    category: '玄幻',
    secondary_category: '异世大陆',
    cover:
      'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/fad8729e2f729578cb5d3bed2c1d6c37.jpeg',
    status: 'complet',
    profile:
      '蒸汽与机械的浪潮中，谁能触及非凡？历史和黑暗的迷雾里，又是谁在耳语？我从诡秘中醒来，睁眼看见这个世界:枪械，大炮，巨舰，飞空艇，差分机；魔药，占卜，诅咒，倒吊人，封印物……光明依旧照耀，神秘从未远离，这是一段“愚者”的传说。',
    latestChapters: '第四十一章 新的旅程',
    latestTime: '2022-11-25 16:27',
    rank: 1,
  })),
)

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
</script>

<template>
  <div class="main">
    <div class="title">月票榜</div>
    <div class="time">
      <div class="year">
        <el-select v-model="year" placeholder="选择年份">
          <el-option
            v-for="yearOption in years"
            :key="yearOption"
            :label="yearOption + '年'"
            :value="yearOption"
          ></el-option>
        </el-select>
      </div>
      <div class="month">
        <el-select v-model="month" placeholder="选择月份">
          <el-option
            v-for="monthOption in months"
            :key="monthOption"
            :label="monthOption + '月'"
            :value="monthOption"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="category">
      <span>全部分类</span>
      <span v-for="category in categories" :key="category.id">
        {{ category.name }}
      </span>
    </div>
    <div class="books">
      <RankBooks
        :rankBook="rankBook"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  margin-top: -15px;
  margin-left: 20px;
  margin-bottom: 20px;
  font-size: 25px;
  font-family: '华文中宋', serif;
}

.time {
  margin-left: 20px;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  .year {
    width: 100px;
  }

  .month {
    width: 100px;
  }
}

.category {
  height: 40px;
  margin-bottom: 15px;
  margin-left: 20px;
  background-color: #eefcff;
  line-height: 40px;

  span {
    margin-right: 18px;
    font-size: 13px;
  }
}

</style>
