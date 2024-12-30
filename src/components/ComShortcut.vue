<script setup>
import { ref} from 'vue'

import { useUserStore } from '@/stores/index.js'
import { ElMessageBox } from 'element-plus'
import LoginDialog from '@/components/LoginDialog.vue'

const loginDialogRef = ref()

const openLoginDialog = () => {
  loginDialogRef.value.open()
}

const store = useUserStore()
const isLoggedIn = ref(store.token !== '')
const username = ref(store.user.username || '')

const logout = async () => {
   await ElMessageBox.confirm('你确认要进行退出么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
  })

  store.removeToken()
  store.setUser({})
  isLoggedIn.value = false;
}


</script>

<template>
  <section class="shortcut">
    <div class="w">
      <template v-if=" store.token!=='' ">
        <!-- 用户已登录 -->
        <div class="user-info">
          <span>欢迎~&nbsp;&nbsp;&nbsp;</span>
          <router-link to="/user" class="myInfo">{{ store.user.username  }}</router-link>
          <span>|</span>
          <span @click="logout" class="logout">退出</span>
        </div>
      </template>
      <template v-else>
        <div class="user-dropdown">
          <span @click="openLoginDialog" class="btn login-btn">登录</span>
          <span>|</span>
          <router-link to="/register" class="btn register-btn">注册</router-link>
        </div>
      </template>
    </div>
    <div>
      <LoginDialog ref="loginDialogRef" ></LoginDialog>
    </div>
  </section>
</template>

<style scoped lang="scss">
.w {
  width: 950px;
  margin: 0 auto;
}

.shortcut {
  margin-top: -7px;
  margin-left: -7px;
  margin-right: -7px;
  background-color: #f7f7f7;
  height: 30px;
  border-bottom: 1px solid #d6d1d1;

  .user-info {
    float: right;
    font-size: 13px;
    font-weight: 300;
    margin-top: 6px;

    span {
      color: #bebfc1;
      font-size: 13px;
      font-weight: 300;
    }

    .myInfo {
      text-decoration: none;
      color: #6c6b6b;
      margin-right: 8px;
    }

    .myInfo:hover {
      color: crimson;
    }

    .logout {
      text-decoration: none;
      color: #d9dfe9;
      margin-left: 8px;
    }

    .logout:hover {
      color: crimson;
    }
  }

  .user-dropdown {
    float: right;

    .btn {
      font-size: 13px;
      margin-right: 8px;
      border: none;
      text-decoration: none;
      font-weight: 300;
    }

    span {
      color: #d9dfe9;
    }

    .login-btn {
      color: #6c6b6b;
    }

    .login-btn:hover {
      color: crimson;
    }

    .register-btn {
      color: #d9dfe9;
      margin-left: 8px;
    }

    .register-btn:hover {
      color: crimson;
    }
  }
}
</style>
