<script setup>
import { ref } from 'vue'

const balance = ref(1234) // 用户余额
const params = ref({
  pageNum: 3, // 当前页码
  pageSize: 10, // 每页条数
})
const total = ref(100)
// 消费记录相关数据
const consumptionRecords = ref([
  {
    amount: 20,
    time: '2023-12-01 14:00',
    type: '购买章节',
    book: '凡人修仙传',
    chapter: '第一章,第一章,第一章,第一章,',
  },
  { amount: 15, time: '2023-11-15 10:30', type: '购买章节', book: '全职高手', chapter: '第二章' },
  // 添加更多数据...
])
const months = ref(
  Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    return {
      label: `${date.getFullYear()}年${date.getMonth() + 1}月`,
      value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
    }
  }),
)
const selectedMonth = ref(months.value[0].value)
// 充值记录相关数据
const rechargeRecords = ref([
  { amount: 100.0, time: '2023-12-01', remark: '微信支付' },
  { amount: 50.0, time: '2023-11-10', remark: '支付宝支付' },
  // 添加更多数据...
])
const years = ref(
  Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - i
    return { label: `${year}年`, value: year }
  }),
)
const selectedYear = ref(years.value[0].value)
const rechargePagination = ref({ page: 1, pageSize: 5 })
//处理分页
const onSizeChange = (size) => {
  params.value.pageNum = 1
  params.value.pageSize = size
}
const onCurrentChange = (currentPage) => {
  params.value.pageNum = currentPage
}
</script>

<template>
  <div class="main">
    <!-- 余额卡片 -->
    <el-card class="balance-card">
      <div class="balance-info">
        <h3>当前余额</h3>
        <p>
          <span class="balance-amount">{{ balance }}</span> 点
        </p>
        <el-button class="recharge">充值</el-button>
      </div>
    </el-card>

    <!-- 消费记录和充值记录 -->
    <el-tabs>
      <!-- 消费记录 -->
      <el-tab-pane label="消费记录">
        <div class="consume">
          <div class="filter-bar">
            <p>共消费<span> 1120 </span>点</p>
            <el-select v-model="selectedMonth" placeholder="选择月份" style="width: 200px">
              <el-option
                v-for="month in months"
                :key="month.value"
                :label="month.label"
                :value="month.value"
              />
            </el-select>
          </div>
          <el-table :data="consumptionRecords" style="width: 100%">
            <el-table-column prop="amount" label="消费金额" width="100" />
            <el-table-column prop="time" label="消费时间" width="150" />
            <el-table-column prop="type" label="类型" width="100" />
            <el-table-column prop="book" label="书名" width="170" />
            <el-table-column prop="chapter" label="章节" :show-overflow-tooltip="true" />
          </el-table>
          <div class="pagination">
            <el-pagination
              v-model:current-page="params.pageNum"
              v-model:page-size="params.pageSize"
              page-sizes="10"
              layout="prev, pager, next"
              background
              :total="total"
              @size-change="onSizeChange"
              @current-change="onCurrentChange"
              style="margin-top: 20px; justify-content: flex-end"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>

      <!-- 充值记录 -->
      <el-tab-pane label="充值记录">
        <div class="recharge">
          <div class="filter-bar">
            <el-select
              v-model="selectedYear"
              style="width: 150px; float: right; margin-right: 20px; margin-bottom: 15px"
              placeholder="选择年份"
            >
              <el-option
                v-for="year in years"
                :key="year.value"
                :label="year.label"
                :value="year.value"
              />
            </el-select>
          </div>
          <el-table :data="rechargeRecords" style="width: 100%">
            <el-table-column prop="amount" label="充值金额" width="200" />
            <el-table-column prop="time" label="充值时间" width="250" />
            <el-table-column prop="remark" label="备注" />
          </el-table>
          <div class="pagination">
            <el-pagination
              layout="prev, pager, next"
              :page-size="rechargePagination.pageSize"
              :total="rechargeRecords.length"
              @current-change="handleRechargePageChange"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.main {
  padding: 0 20px;
}

.balance-card {
  margin-bottom: 30px;
  position: relative;

  h3 {
    font-size: 18px;
    margin-left: 10px;
    margin-top: 10px;
  }

  .balance-amount {
    font-size: 26px;
    color: #19bad8;
    font-weight: bold;
    margin: 10px 5px 0;
  }

  .recharge {
    position: absolute;
    right: 40px;
    top: 55px;
    padding: 0 20px;
    width: 100px;
    background-color: #ed0b38;
    color: #fff;
  }

  .recharge:hover {
    opacity: 0.8;
  }
}

.filter-bar {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;

  p {
    flex: 1;
    margin-top: 5px;
  }

  span {
    font-size: 20px;
    color: #ed0b38;
  }
}

.pagination {
  margin-top: 10px;
  margin-left: 250px;
}
</style>
