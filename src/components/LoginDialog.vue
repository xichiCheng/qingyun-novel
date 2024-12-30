<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from '@/stores'

import img from '@/assets/img/img.png'
import { Lock, Iphone } from '@element-plus/icons-vue'
const router = useRouter();
const isPasswordLogin = ref(true); // 登录方式切换


const loginForm = ref({
  phone: "",
  password: "",
  smsCode: "",
});

const isLogin = ref(false);
const open = async () => {
  isLogin.value = true;
};
defineExpose({
  open,
});


const sendSmsCode = () => {
  if (!/^\d{11}$/.test(loginForm.value.phone)) {
    ElMessage.error("请输入正确的手机号！");
    return;
  }
  ElMessage.success("短信验证码已发送！");
};
const userStore = useUserStore()
const handleLogin = () => {
  if (!/^\d{11}$/.test(loginForm.value.phone)) {
    ElMessage.error("请输入正确的手机号！");
    return;
  }
  if (isPasswordLogin.value) {
    if (!loginForm.value.password) {
      ElMessage.error("请输入密码！");
      return;
    }
  } else {
    if (!loginForm.value.smsCode) {
      ElMessage.error("请输入验证码！");
      return;
    }
  }
  const books =
    Array.from({ length: 10 }, () => (
      { id: 2, sign: true, category: '现代言情', name: '喜欢你我说了算', latestChapter: '第337章 我愿望都实现了呢', updateTime: '2024-12-23 22:00', author: '叶非夜' }
    ))
  const user = {
    id:9,
    avatar: 'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/avatar.jpg', // 头像占位图
    username: '陈兮迟',
    introduction: '这是我的简介，专注阅读与分享。',
    gender: 0,
    balance: 1314, // 账户余额
    allPassTickets: 4,
    passTickets: 2, // 本月剩余月票数量
    allRecommendTickets: 5,
    recommendTickets: 1, // 本日剩余推荐票数量
    bookshelfCount: 30, // 书架藏书数量
    books: books       //书架
  }

  userStore.setToken('ABC123')
  userStore.setUser(user)
  ElMessage.success("登录成功！");

  isLogin.value = false

};
</script>

<template>
    <el-dialog v-model="isLogin" width="730px">
      <div class="container">
        <div class="img">
          <el-image :src="img"></el-image>
        </div>
        <div class="login-container">
          <span class="title">登录</span>
          <div class="input">
            <el-form :model="loginForm" label-width="80px">
              <el-form-item >
                <el-input
                  v-model="loginForm.phone"
                  placeholder="请输入手机号"
                  class="custom-input"
                  maxlength="11"
                  style="width: 300px"
                  :prefix-icon="Iphone"
                />
              </el-form-item>
              <template v-if="isPasswordLogin">
                <el-form-item >
                  <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" style="width: 300px;"  :prefix-icon="Lock"/>
                </el-form-item>
                <div class="helper-links">
                  <span @click="isPasswordLogin = false" class="link">手机验证码登录</span>
                  <span> | </span>
                  <span @click="router.push('/register')" class="link">注册</span>
                </div>
              </template>
              <template v-else>
                <el-form-item >
                  <el-input v-model="loginForm.smsCode" placeholder="验证码" maxlength="6" style="width: 300px;">
                    <template #append>
                      <el-button @click="sendSmsCode">发送验证码</el-button>
                    </template>
                  </el-input>
                </el-form-item>
                <div class="helper-links">
                  <span @click="isPasswordLogin = true" class="link">密码登录</span>
                  <span> | </span>
                  <span @click="router.push('/register')" class="link">注册</span>
                </div>
              </template>
            </el-form>
          </div>
          <button class="login" @click="handleLogin">登录</button>
        </div>
      </div>
    </el-dialog>
</template>

<style scoped lang="scss">
.container{
  height: 310px;
  display: flex;
}

.img{
  margin-top: 40px;
  width: 330px;
  height: 200px;
}

.login-container {
  margin-left: 10px;
  width: 380px;
  height: 295px;

  border-left: 1px solid #e6e0e0;


  .title{
    display: block;
    text-align: center;
    font-size: 25px;
    margin-bottom: 20px;
    color: black;
  }
  .input{
    margin-top: 30px;
    margin-left: -40px;
  }
  .login{
    margin-left: 40px;
    height: 40px;
    background-color: #dc0a34;
    color: white;
    border: none;
    width: 300px;
    font-size: 18px;
  }
  .login:hover{
    opacity: 0.8;
  }


}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 0 var(--el-input-border-color, var(--el-border-color)) inset;
  border: 1px solid #dcd6d6;
  border-radius: 0;
  height: 40px;
  cursor: default;
  .el-input__inner {
    cursor: default !important;
  }
}
.helper-links {
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
}

.helper-links .link:hover {
  color: #ed0b38;
}
</style>
