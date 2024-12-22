<template>
  <el-container>
    <!-- Header -->
    <el-header>
      <div class="header">排行榜</div>
    </el-header>

    <!-- Main Container -->
    <el-container>
      <!-- Left Aside -->
      <el-aside width="200px" class="aside">
        <el-menu
          default-active="0"
          @select="handleRankChange"
          class="rank-menu"
        >
          <el-menu-item index="0">月票榜</el-menu-item>
          <el-menu-item index="1">畅销榜</el-menu-item>
          <el-menu-item index="2">新书热销榜</el-menu-item>
          <el-menu-item index="3">推荐榜</el-menu-item>
          <el-menu-item index="4">收藏榜</el-menu-item>
          <el-menu-item index="5">总字数榜</el-menu-item>
        </el-menu>
      </el-aside>

      <!-- Main Content -->
      <el-main>
        <div class="filters">
          <!-- Top Filters -->
          <div v-if="currentRank === '月票榜'" class="filter-group">
            <el-radio-group v-model="timeFilter">
              <el-radio-button label="年">年</el-radio-button>
              <el-radio-button label="月">月</el-radio-button>
            </el-radio-group>
          </div>
          <div v-if="currentRank === '推荐榜'" class="filter-group">
            <el-radio-group v-model="recommendFilter">
              <el-radio-button label="周榜">周榜</el-radio-button>
              <el-radio-button label="月榜">月榜</el-radio-button>
              <el-radio-button label="总榜">总榜</el-radio-button>
            </el-radio-group>
          </div>
          <div class="category-filters">
            <el-button
              v-for="category in categories[currentRank]"
              :key="category.id"
              class="category-filter"
              type="primary"
              plain
              @click="handleCategoryChange(category.id)"
            >
              {{ category.name }}
            </el-button>
          </div>
        </div>

        <!-- Right Content -->
        <div class="rank-content">
          <div
            v-for="(item, index) in rankData"
            :key="index"
            class="rank-item"
          >
            <span class="rank-index">{{ index + 1 }}</span>
            <img class="rank-cover" :src="item.cover" alt="cover" />
            <div class="rank-info">
              <h3 class="rank-title">{{ item.title }}</h3>
              <p class="rank-author">{{ item.author }}</p>
              <p class="rank-score">{{ item.score }}</p>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from "vue";

// 当前榜单类型
const currentRank = ref("月票榜");

// 时间过滤条件
const timeFilter = ref("月");
const recommendFilter = ref("周榜");

// 分类数据
const categories = ref({
  月票榜: [
    { id: 1, name: "全部" },
    { id: 2, name: "分类1" },
    { id: 3, name: "分类2" },
  ],
  畅销榜: [
    { id: 1, name: "全部" },
    { id: 2, name: "分类1" },
    { id: 3, name: "分类2" },
    { id: 4, name: "分类3" },
  ],
  新书热销榜: [
    { id: 1, name: "全部" },
    { id: 2, name: "分类1" },
    { id: 3, name: "分类2" },
    { id: 4, name: "分类3" },
  ],
  推荐榜: [
    { id: 1, name: "全部" },
    { id: 2, name: "分类1" },
    { id: 3, name: "分类2" },
    { id: 4, name: "分类3" },
  ],
  收藏榜: [
    { id: 1, name: "全部" },
    { id: 2, name: "分类1" },
    { id: 3, name: "分类2" },
    { id: 4, name: "分类3" },
  ],
  总字数榜: [
    { id: 1, name: "全部" },
    { id: 2, name: "分类1" },
    { id: 3, name: "分类2" },
    { id: 4, name: "分类3" },
  ],
});

// 假数据
const rankData = ref(
  Array.from({ length: 10 }, (_, i) => ({
    title: `小说标题 ${i + 1}`,
    author: `作者 ${i + 1}`,
    score: `${Math.floor(Math.random() * 1000)} 点`,
    cover: "https://via.placeholder.com/80x100",
  }))
);

// 方法：切换榜单
const handleRankChange = (index) => {
  const rankList = ["月票榜", "畅销榜", "新书热销榜", "推荐榜", "收藏榜", "总字数榜"];
  currentRank.value = rankList[index];
};

// 方法：切换分类
const handleCategoryChange = (id) => {
  console.log(`选择的分类 ID: ${id}`);
};
</script>

<style scoped>
.header {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.aside {
  background: #f5f5f5;
  padding: 10px;
}

.rank-menu {
  border: none;
}

.filters {
  margin-bottom: 20px;
}

.filter-group {
  margin-bottom: 10px;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.rank-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rank-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rank-index {
  font-size: 20px;
  font-weight: bold;
}

.rank-cover {
  width: 80px;
  height: 100px;
  object-fit: cover;
}

.rank-info {
  flex: 1;
}

.rank-title {
  font-size: 16px;
  font-weight: bold;
}

.rank-author,
.rank-score {
  font-size: 14px;
  color: #666;
}
</style>
