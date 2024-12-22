<script setup>
import { ref } from 'vue'
import RankList from '@/components/RankList.vue'

// 示例数据
const monthlyTickets = ref([
  { id: 1, name: '诡秘之主', number: 1200, type: '玄幻', author: '爱潜水的乌贼' },
  { id: 2, name: '星辰变', number: 1100, type: '奇幻', author: '我吃西红柿' },
  { id: 3, name: '盘龙', number: 1000, type: '奇幻', author: '我吃西红柿' },
])

const selling = ref([
  { id: 1, name: '全职高手', number: '销量冠军', type: '游戏', author: '蝴蝶蓝' },
  { id: 2, name: '斗破苍穹', number: 980, type: '玄幻', author: '天蚕土豆' },
])

const newBooks = ref([
  { id: 1, name: '万族之劫', number: 300, type: '玄幻', author: '老鹰吃小鸡' },
  { id: 2, name: '大奉打更人', number: 250, type: '仙侠', author: '卖报小郎君' },
])

const recommendations = ref([
  { id: 2, name: '斗罗大陆', number: 450, type: '玄幻', author: '唐家三少' },
])

const collections = ref([
  { id: 1, name: '剑来', number: 600, type: '玄幻', author: '烽火戏诸侯' },
  { id: 2, name: '诛仙', number: 580, type: '仙侠', author: '萧鼎' },
])

const wordCounts = ref([
  { id: 1, name: '凡人修仙传', number: '446.5万字', type: '仙侠', author: '忘语' },
  { id: 2, name: '圣墟', number: '400万字', type: '玄幻', author: '辰东' },
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
        type="2"
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
