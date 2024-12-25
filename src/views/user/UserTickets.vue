<script setup>
import { ref } from 'vue';
import passIcon from '@/assets/img/pass.png'
import recommendedIcon from '@/assets/img/tuijian.png'
// 模拟数据
const monthlyVotes = ref({
  obtained: 10, // 本月已获得
  used: 5, // 已使用
  available: 5, // 可用
});

const recommendVotes = ref({
  obtained: 15, // 本日已获得
  used: 8, // 已使用
  available: 7, // 可用
});

const monthlyVoteRecords = ref([
  { id: 1, date: '2023-12-23', book: '凡人修仙传', chapter: '第123章', count: 2 },
  { id: 2, date: '2023-12-21', book: '全职高手', chapter: '第89章', count: 3 },
]);

const recommendVoteRecords = ref([
  { id: 1, date: '2023-12-24', book: '斗破苍穹', chapter: '第45章', count: 1 },
  { id: 2, date: '2023-12-22', book: '择天记', chapter: '第68章', count: 2 },

]);

</script>

<template>
  <div class="main">
    <!-- 月票 Card -->
    <el-card shadow="none" class="card">
      <div class="icon">
        <el-image :src="passIcon" alt="月票"></el-image>
      </div>
      <div class="stats">
        <span class="title">月票</span>
        <div>
          <p>本月已获得月票：<span>{{ monthlyVotes.obtained }}</span></p>
          <p>已使用：<span>{{ monthlyVotes.used }}</span></p>
          <p>可用：<span>{{ monthlyVotes.available }}</span></p>
        </div>
      </div>
      <div class="explain">
        <p>每月每花费1000点可获赠一张月票，上限5张</p>
      </div>
    </el-card>

    <!-- 推荐票 Card -->
    <el-card shadow="none" class="card">
      <div class="icon">
        <el-image :src="recommendedIcon" alt="推荐票"></el-image>
      </div>
      <div class="stats">
        <span class="title">推荐票</span>
        <div>
          <p>本日已获得推荐票：<span>{{ recommendVotes.obtained }}</span></p>
          <p>已使用：<span>{{ recommendVotes.used }}</span></p>
          <p>可用：<span>{{ recommendVotes.available }}</span></p>
        </div>
      </div>
      <div class="explain">
        <p>普通用户每天可获取2张推荐票</p>
      </div>
    </el-card>

    <!-- 投票记录 Tabs -->
    <el-tabs>
      <el-tab-pane label="投月票记录">
        <p>近12个月累计投出月票 <span>12</span> 次</p>
        <el-table :data="monthlyVoteRecords" style="width: 100%" >
          <el-table-column prop="date" label="日期" width="200"></el-table-column>
          <el-table-column prop="book" label="书名" width="250"></el-table-column>
          <el-table-column prop="count" label="投票数量" width="250"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="投推荐票记录">
        <p>近30天累计投出推荐票 <span>2</span> 次</p>
        <el-table :data="recommendVoteRecords" style="width: 100%">
          <el-table-column prop="date" label="日期" width="200"></el-table-column>
          <el-table-column prop="book" label="书名" width="250"></el-table-column>
          <el-table-column prop="count" label="投票数量" width="250"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.main {
  padding: 0 20px;
}


.card {
  height: 150px;
  margin-bottom: 30px;
  padding: 10px;
  border: 1px solid #ebeef5;
  position: relative;
  .icon{
    height: 110px;
    width: 60px;
    float: left;
    margin-right: 30px;
  }

  .stats{
    float: left;
    margin-top: 5px;
    margin-bottom: 10px;
    .title {
      font-weight: bold;
      font-size: 18px;
    }

    p{
      float: left;
      margin-right: 15px;

      span{
        font-size: 24px;
        color: #ed0b38;
        font-weight: bold;
      }
    }
  }

  .explain{
    width: 700px;
    color: #9f9f9f;
    font-size: 15px;
    border-top: 1px solid #ebeef5;
    position: absolute;
    top:120px;
  }
}



.stats p {
  margin: 5px 0;
}

.el-table {
  margin-top: 15px;
}
</style>
