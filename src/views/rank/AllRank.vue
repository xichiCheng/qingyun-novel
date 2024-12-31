<script setup>
import { ref,computed } from 'vue'
import RankList from '@/components/RankList.vue'
import {useCategoryStore} from '@/stores/index.js'
const categoryStore = useCategoryStore()
import router from '@/router/index.js'
const route = computed(() => router.currentRoute.value);

const categoryId = ref(route.value.query.id || 0)

const categories = categoryStore.getCategories()

// 示例数据
const passTickets = ref(
  Array.from({ length: 10 }, () => ({
    id: 1, name: '喜欢你我说了算', number: '123456', type: '现代言情', author: '叶非夜',cover:  'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/600.webp',
  }))
)
const selling = ref(
  Array.from({ length: 10 }, () => ({
    id: 1, name: '喜欢你我说了算', number: '123456', type: '现代言情', author: '叶非夜',cover:  'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/600.webp',
  }))
)

const newBooks = ref([
  { id: 1, name: '喜欢你我说了算', number: '', type: '现代言情', author: '叶非夜' },
  { id: 1, name: '喜欢你我说了算', number: '', type: '现代言情', author: '叶非夜' },
])

const recommendations = ref([
  { id: 1, name: '喜欢你我说了算', number: '1211455', type: '现代言情', author: '叶非夜' },
  { id: 1, name: '喜欢你我说了算', number: '233311', type: '现代言情', author: '叶非夜' },
])

const collections = ref([
  { id: 1, name: '喜欢你我说了算', number: '2141414', type: '现代言情', author: '叶非夜' },
  { id: 1, name: '喜欢你我说了算', number: '1211321', type: '现代言情', author: '叶非夜' },
])

</script>

<template>
  <div class="main">
    <div class="title">人气榜单</div>
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
    <div class="rank-list">
      <RankList
        title="月票榜"
        name="pass"
        type="0"
        :books="passTickets"
        :img="passTickets[0].cover"
        class="rank"
      />
      <RankList
        title="畅销榜"
        name="selling"
        type="1"
        :books="selling"
        :img="selling[0].cover"
        class="rank"
      />
      <RankList
        title="新书热销榜"
        name="newBook"
        type="1"
        :books="newBooks"
        img="https://example.com/image3.jpg"
        class="rank"
      />
      <RankList
        title="推荐榜"
        name="recommend"
        type="2"
        :books="recommendations"
        img="https://example.com/image4.jpg"
        class="rank"
      />
      <RankList
        title="收藏榜"
        name="collection"
        type="3"
        :books="collections"
        img="https://example.com/image5.jpg"
        class="rank"
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

.rank {
  float: left;
  margin-left: 26px;
}

</style>
