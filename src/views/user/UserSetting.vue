<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const userInfo = ref({
  nickname: 'Aurore',
  avatar: 'https://chen-novel.oss-cn-hangzhou.aliyuncs.com/novel/avatar.jpg', // 初始头像 URL
  gender: 'male',
  introduction: '这是我的个人简介。',
})

const imgUrl = ref(userInfo.value.avatar)
const uploadRef = ref()

const onSelectFile = (uploadFile) => {
  // 使用 FileReader 进行图片预览
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}

const saveChanges = () => {
  if (userInfo.value.nickname.length > 10) {
    ElMessage.error('昵称不得超过10个字！')
    return
  }
  if (userInfo.value.introduction.length > 100) {
    ElMessage.error('简介不得超过100个字！')
    return
  }
  // 模拟保存操作
  ElMessage.success('个人信息已保存！')
}

</script>

<template>
  <div class="settings-page">
    <h2>个人信息设置</h2>

    <el-form :model="userInfo" label-position="top" class="settings-form">
      <!-- 昵称 -->
      <el-form-item label="昵称">
        <el-input
          v-model="userInfo.nickname"
          placeholder="请输入您的昵称（不超过10个字）"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>

      <!-- 头像上传 -->
      <el-form-item label="头像">
        <div class="avatar-uploader-container">
          <el-upload
            ref="uploadRef"
            :auto-upload="false"
            class="avatar-uploader"
            :show-file-list="false"
            :on-change="onSelectFile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" alt="头像" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
          <br />
          <el-button
            @click="uploadRef.$el.querySelector('input').click()"
            type="primary"
            size="medium"
          >
            选择图片
          </el-button>
        </div>
      </el-form-item>

      <!-- 性别 -->
      <el-form-item label="性别">
        <el-radio-group v-model="userInfo.gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
          <el-radio label="other">其他</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 简介 -->
      <el-form-item label="简介">
        <el-input
          type="textarea"
          v-model="userInfo.introduction"
          placeholder="请输入您的简介（不超过100个字）"
          maxlength="100"
          show-word-limit
          rows="3"
        />
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="saveChanges">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.settings-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar-uploader-container {
  text-align: center;
  margin-bottom: 20px;
}

.avatar-uploader {
  display: inline-block;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ccc;
}

.avatar-uploader-icon {
  width: 150px;
  height: 150px;
  font-size: 28px;
  color: #8c939d;
  border: 1px dashed var(--el-border-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.settings-form .el-form-item {
  margin-bottom: 20px;
}
</style>
