<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const registerForm = ref({
  phone: "",
  smsCode: "",
  password: "",
  confirmPassword: "",
});

const sendSmsCode = () => {
  if (!/^\d{11}$/.test(registerForm.value.phone)) {
    ElMessage.error("请输入正确的手机号！");
    return;
  }
  ElMessage.success("短信验证码已发送！");
};

const handleRegister = () => {
  if (!/^\d{11}$/.test(registerForm.value.phone)) {
    ElMessage.error("请输入正确的手机号！");
    return;
  }
  if (!registerForm.value.smsCode) {
    ElMessage.error("请输入验证码！");
    return;
  }
  if (
    !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|.*\W).{8,16}$/.test(registerForm.value.password)
  ) {
    ElMessage.error("密码需为8-16位，包括大小写字母、数字或符号！");
    return;
  }
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    ElMessage.error("两次密码输入不一致！");
    return;
  }
  ElMessage.success("注册成功！");
};
</script>

<template>
  <div class="main">
    <span class="title">用户注册</span>
    <div class="register-container">
      <el-form :model="registerForm" label-width="100px">
        <el-form-item label="手机号">
          <el-input v-model="registerForm.phone" placeholder="请输入手机号" maxlength="11" />
        </el-form-item>
        <br>
        <el-form-item label="验证码">
          <el-input v-model="registerForm.smsCode" placeholder="请输入验证码" maxlength="6">
            <template #append>
              <el-button @click="sendSmsCode">发送验证码</el-button>
            </template>
          </el-input>
        </el-form-item>
        <br>
        <el-form-item label="密码">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="8-16位，包含大小写字母/符号/数字"
          />
        </el-form-item>
        <br>
        <el-form-item label="确认密码">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
          />
        </el-form-item>
      </el-form>
      <div class="helper-links">
        <span @click="router.push('/login')" class="link">已有账号？去登录</span>
      </div>
      <button class="register" @click="handleRegister">注册</button>
    </div>
  </div>

</template>

<style scoped>
.title{
  display: inline-block;
  margin-top: 50px;
  padding-left: 520px;
  padding-bottom: 20px;
  font-size: 25px;
  width: 570px;
  height: 30px;
  margin-left: 40px;
  border-bottom: 1px solid #dfdede;
}
.register-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;

}
.helper-links {
  margin: 15px 0;
  text-align: right;
  font-size: 14px;
}
.helper-links .link {
  cursor: pointer;

}
.helper-links .link:hover {
  color: #ed0b38;
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

.register{
  margin-left: 100px;
  height: 40px;
  background-color: #dc0a34;
  color: white;
  border: none;
  width: 300px;
  font-size: 18px;
}
</style>
