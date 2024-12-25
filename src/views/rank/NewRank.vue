<script setup>
import { ref } from 'vue'
import RankBooks from '@/views/rank/components/RankBooks.vue'

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
    rank: 1,
  })),
)
</script>

<template>
  <div class="main">
    <div class="title">新书热销榜</div>
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
