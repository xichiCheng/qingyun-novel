<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Setting } from '@element-plus/icons-vue'

const router = useRouter()

// 模拟用户数据
const user = ref({
  avatar: 'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/avatar.jpg', // 头像占位图
  username: '陈兮迟',
  introduction: '这是我的简介，专注阅读与分享。',
  balance: 100, // 账户余额
  monthlyTickets: 5, // 月票数量
  recommendTickets: 12, // 推荐票数量
  bookshelfCount: 30, // 书架藏书数量
})

// 跳转到设置页面
const goToSettings = () => {
  router.push({ path: '/user/setting' })
}

// 操作函数
const resetBalance = () => {
  console.log('余额重置！') // 实际操作可调用后端接口
  user.value.balance = 0
}

const viewTickets = () => {
  router.push({ path: '/user/tickets' })
}

const viewBookshelf = () => {
  router.push({ path: '/user/bookshelf' })
}
</script>

<template>
  <div class="main">
    <!-- 顶部信息卡 -->
    <el-card class="user-card">
      <div class="user-info">
        <div class="user-avatar">
          <el-avatar :size="110" :src="user.avatar" />
        </div>
        <div class="user-details">
          <h2>{{ user.username }}</h2>
          <p>{{ user.introduction }}</p>
        </div>
        <el-button class="settings-button" @click="goToSettings" :icon="Setting"
          >设置
        </el-button>
      </div>
    </el-card>

    <!-- 账户信息部分 -->
    <div class="account-sections">
      <div class="account-card balance">
        <svg class="icon accountIcon" aria-hidden="true">
          <use xlink:href="#icon-yue"></use>
        </svg>
        <span class="title">账户余额</span>
        <p><span class="number">{{ user.balance }}</span> 点</p>
        <el-divider></el-divider>
        <el-button  @click="resetBalance">立即充值</el-button>
      </div>
      <div class="account-card pass">
        <svg class="icon accountIcon" aria-hidden="true">
          <use xlink:href="#icon-toupiao"></use>
        </svg>
        <span class="title">我的票夹</span>
        <p><span class="number">{{ user.monthlyTickets }}</span> 月票</p>
        <p><span class="number">{{ user.recommendTickets }}</span> 推荐票</p>
        <el-divider></el-divider>
        <el-button @click="viewTickets">立即查看</el-button>
      </div>
      <div class="account-card bookshelf">
        <svg class="icon accountIcon" aria-hidden="true">
          <use xlink:href="#icon-wodeshujia"></use>
        </svg>
        <span class="title">我的书架</span>
        <p><span class="number">{{ user.bookshelfCount }}</span> 本藏书</p>
        <el-divider></el-divider>
        <el-button @click="viewBookshelf">立即查看</el-button>
      </div>
    </div>
  </div>
</template>



<style scoped>
.main {
  padding: 0 20px;
}

.user-card {
  padding: 20px;

  .user-info {
    display: flex;
    align-items: center;
    gap: 30px;
    height: 120px;

    .user-details h2 {
      margin-bottom: 10px;
      margin-top: -15px;
      font-size: 20px;
      font-weight: bold;
    }

    .user-details p {
      width: 300px;
      font-size: 15px;
      margin: 5px 0 0;
      color: #666;
    }

    .settings-button {
      margin-left: 120px;
    }
  }
}

.account-sections {
  height: 190px;
  margin-top: 40px;
  border:1px solid #dddcdc;
  .account-card {
    padding: 20px 35px;
    width: 185px;
    height: 150px;
    float: left;
    border-right: 1px solid #dddcdc;

    .title{
      display: block;
      margin-left: 45px;
      margin-top: -27px;
    }

    .number{
      font-size: 22px;
      font-weight: bold;
      color: #ed0b38;
    }

    p{
      display: inline-block;
      margin-right: 10px;
      height: 5px;
    }

  }
  .bookshelf{
    border-right: none;
  }

  .accountIcon{
    color: #5e5e5e;
  }
}


</style>
