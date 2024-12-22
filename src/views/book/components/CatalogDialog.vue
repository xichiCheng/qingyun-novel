<script setup>
import { ref, computed } from 'vue';
import { Lock, SortDown, SortUp } from '@element-plus/icons-vue';

const isVisible = ref(false);
const open = async (id) => {
  isVisible.value = true;
};
defineExpose({
  open,
});

const catalog = ref(
  Array.from({ length: 100 }, (_, i) => ({
    number: i + 1,
    title: `章节标题${i + 1}章`,
    isLocked: i >= 10, // 前 10 章免费，之后为付费章节
  }))
);

const isDescending = ref(false);
const novelStatus = '连载中';

const toggleOrder = () => {
  isDescending.value = !isDescending.value;
};

// 动态排序的目录
const sortedCatalog = computed(() =>
  [...catalog.value].sort((a, b) =>
    isDescending.value ? b.number - a.number : a.number - b.number
  )
);

const selectChapter = (chapter) => {
  console.log('Selected Chapter:', chapter);
};
</script>


<template>
  <el-dialog v-model="isVisible" width="790" top="0vh" style="background-color:#faf9f4;">
    <div class="catalog-header">
      <span class="title">目录</span>
      <span>{{ novelStatus }}</span>
      ·
      <span>共 {{ catalog.length }} 章</span>
      <el-button
        type="text"
        @click="toggleOrder"
        class="sort"
      >
        <el-icon v-if="isDescending"><SortUp /></el-icon>
        <el-icon v-if="!isDescending"><SortDown /></el-icon>
        &nbsp;{{ isDescending ? '倒序' : '升序' }}
      </el-button>
    </div>
    <div class="catalog-list">
      <div class="catalog-row" v-for="(item, index) in sortedCatalog" :key="index">
        <div class="catalog-item" @click="selectChapter(item.number)">
          <span>第{{ item.number }}章 {{ item.title }}</span>
          <el-icon v-if="item.isLocked" size="18" class="locked-icon">
            <Lock />
          </el-icon>
        </div>
      </div>
    </div>
  </el-dialog>
</template>


<style scoped lang="scss">

.catalog-header {
  margin: 10px 20px;

  span{
    color: #9f9f9f;
    margin: 0 5px;
  }
  .title{
    color: #323131;
    font-size: 25px;
    margin-right: 15px;
  }
  .sort{
    float: right;
    margin-right: 20px;
    font-family: 微软雅黑,'serif';
    font-size: 15px;
    color: #474646;
  }

}

.catalog-list {
  max-height: 507px;
  overflow-y: auto;
  margin: 10px 0;
  padding: 10px;
  line-height: 2;

  .catalog-row {
    display: inline-block;
    width: 320px;
    margin: 5px 18px;
  }

  .catalog-item {
    flex: 1;
    padding: 10px;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span{
      font-size: 16px;
      display: inline-block;
      width: 260px;
      overflow: hidden; /* 隐藏超出部分 */
      white-space: nowrap; /* 不换行 */
      text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
    }
  }

  .catalog-item:hover {
    background-color: #f0efea;
  }

}


/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px; /* 滚动条宽度 */
}
::-webkit-scrollbar-track {
  background: #faf9f4; /* 滚动条轨道颜色 */
  border-radius: 5px; /* 可选：轨道圆角 */
}
::-webkit-scrollbar-thumb {
  background: #dcdbd6; /* 滚动条颜色 */
  border-radius: 5px; /* 滚动条圆角 */
}
::-webkit-scrollbar-thumb:hover {
  background: #bfbcbc; /* 鼠标悬浮时滚动条颜色 */
}
</style>
