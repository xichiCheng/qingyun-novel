<script setup>
import { ref } from "vue";

// 表示书评数据的示例数据
const postedReviews = ref([
  {
    id: 1,
    content: "这本书非常精彩，情节跌宕起伏！",
    replyCount: 5,
    replyTime: "2024-12-20 14:30",
    reviewArea: "玄幻区",
  },
  {
    id: 2,
    content: "作者的文笔细腻，让人感动。",
    replyCount: 3,
    replyTime: "2024-12-18 10:15",
    reviewArea: "现代区",
  },
]);

const repliedReviews = ref([
  // {
  //   id: 1,
  //   reviewContent: "故事情节不错，但节奏略慢。",
  //   replyContent: "同意，尤其是第三章有点拖沓。",
  //   reviewArea: "悬疑区",
  // },
]);

// 检查是否有数据
const hasPostedReviews = ref(postedReviews.value.length > 0);
const hasRepliedReviews = ref(repliedReviews.value.length > 0);
</script>

<template>
  <div class="main">
    <el-tabs>
      <!-- 发表的书评 -->
      <el-tab-pane label="发表的书评">
        <div v-if="hasPostedReviews">
          <el-table :data="postedReviews"  style="width: 100%">
            <el-table-column prop="content" label="书评内容" :show-overflow-tooltip="true" width="365"></el-table-column>
            <el-table-column prop="replyCount" label="回复"  width="60"></el-table-column>
            <el-table-column prop="replyTime" label="回复时间" width="170"></el-table-column>
            <el-table-column prop="reviewArea" label="所在书评区" width="170" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </div>
        <div v-else class="no-data">
          <el-empty description="近两个月无发表的书评"></el-empty>
        </div>
      </el-tab-pane>

      <!-- 回复的书评 -->
      <el-tab-pane label="回复的书评">
        <div v-if="hasRepliedReviews">
          <el-table :data="repliedReviews" stripe style="width: 100%">
            <el-table-column prop="reviewContent" label="书评"  width="300" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="replyContent" label="回复内容" width="300" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="reviewArea" label="所在书评区" width="170"></el-table-column>
          </el-table>
        </div>
        <div v-else class="no-data">
          <el-empty description="近两个月无回复的书评"></el-empty>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.main {
  padding: 0 20px;
}
.no-data {
  margin-top: 20px;
  text-align: center;
}
</style>
