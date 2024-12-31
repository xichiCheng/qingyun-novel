<script setup>
import { ref,computed } from 'vue'
import RankBooks from '@/views/rank/components/RankBooks.vue'
import {useCategoryStore} from '@/stores/index.js'
const categoryStore = useCategoryStore()
import router from '@/router/index.js'
const route = computed(() => router.currentRoute.value);

const categoryId = ref(route.value.query.id || 0)

const categories = categoryStore.getCategories()
const rankBook = ref(
  Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: '喜欢你我说了算',
    author: '叶非夜',
    wordCount: 603000,
    categoryId: 3,
    subcategoryId: 12,
    cover:
      'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/600.webp',
    status: 1,
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
    <div class="title">畅销榜 <span>本日作品销量排行</span></div>
    <div class="category">
      <span :class="{'active': categoryId===0}" @click="categoryId = Number(0)">全部分类</span>
      <span
        v-for="category in categories"
        :key="category.id"
        :class="{'active': categoryId===category.id}"
        @click="categoryId=category.id"
      >
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

  span{
    font-size: 16px;
    color: #6c6b6b;
    margin-left: 10px;
  }
}

.category{
  height: 40px;
  margin-bottom: 15px;
  margin-left: 20px;
  background-color: #eefcff;
  line-height: 40px;

  span{
    margin-left: 10px;
    margin-right: 8px;
    font-size: 13px;
    cursor: pointer;
  }

  .active{
    color: #ed0b38;
  }
}

</style>
