<script setup>
import { ref } from 'vue'
import RankList from '@/components/RankList.vue'

// 示例数据
const monthlyTickets = ref(
  Array.from({ length: 10 }, () => ({
    id: 1, name: '喜欢你我说了算', number: '123456', type: '现代言情', author: '叶非夜'
  }))
)
const selling = ref(
  Array.from({ length: 10 }, () => ({
  id: 1, name: '喜欢你我说了算', number: '', type: '现代言情', author: '叶非夜'
})))

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

const wordCounts = ref([
  { id: 1, name: '喜欢你我说了算', number: '214214', type: '现代言情', author: '叶非夜' },
  { id: 1, name: '喜欢你我说了算', number: '124122', type: '现代言情', author: '叶非夜' },
])

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
</script>

<template>
  <div class="main">
    <div class="title">人气榜单</div>
    <div class="category">
      <span>全部分类</span>
      <span
        v-for="category in categories"
        :key="category.id"
      >
        {{ category.name }}
      </span>
    </div>
    <div class="rank-list">
      <RankList
        title="月票榜"
        type="0"
        :books="monthlyTickets"
        img="https://example.com/image1.jpg"
        class="rank"
      />
      <RankList
        title="畅销榜"
        type="1"
        :books="selling"
        img="https://example.com/image2.jpg"
        class="rank"
      />
      <RankList
        title="新书热销榜"
        type="1"
        :books="newBooks"
        img="https://example.com/image3.jpg"
        class="rank"
      />
      <RankList
        title="推荐榜"
        type="2"
        :books="recommendations"
        img="https://example.com/image4.jpg"
        class="rank"
      />
      <RankList
        title="收藏榜"
        type="3"
        :books="collections"
        img="https://example.com/image5.jpg"
        class="rank"
      />
      <RankList
        title="总字数榜"
        type="3"
        :books="wordCounts"
        img="https://example.com/image6.jpg"
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
    margin-right: 18px;
    font-size: 13px;
  }
}

.rank {
  float: left;
  margin-left: 20px;
}

</style>
