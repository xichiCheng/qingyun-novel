<script setup>
import { computed, ref } from 'vue'
import {useUserStore} from '@/stores/index.js'
const userStore = useUserStore()
import router from '@/router/index.js'

const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const route = computed(() => router.currentRoute.value)

const myAvatar = userStore.user.avatar || circleUrl
const params = ref({})
// 初始化评论数据
const comments = ref([
  {
    id: 1,
    userId: 1,
    name: '用户A',
    avatar: circleUrl, // 替换为实际头像 URL
    time: new Date(),

    content:
      '这是一个评论内容。这是一个评论内容。这是一个评论内容。这是一个评论内容。这是一个评论内容。这是一个评论内容。这是一个评论内容。这是一个评论内容。这是一个评论内容。这是一个评论内容。这是一个评论内容。',
    likes: 0,
    isLike: false,
    replies: [
      {
        id: 3,
        name: '当前用户',
        avatar: circleUrl, // 替换为实际头像 URL
        time: new Date(),
        content: '确实',
      },{
        id:4,
        name: '用户三',
        avatar: circleUrl, // 替换为实际头像 URL
        time: new Date(),
        content: '别急',
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    name: '用户B',
    avatar: 'https://via.placeholder.com/40',
    time: new Date(),
    content: '这是另一个评论内容。',
    likes: 3,
    isLike: false,
    replies: [],
  },
])

// 格式化时间
const formatTime = (time) => {
  const date = new Date(time)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

// 点赞功能
const likeComment = (id) => {
  const comment = comments.value.find(comment => comment.id === id);
  comment.isLike = !comment.isLike
  if(comment.isLike===true)
    comment.likes++;
  else
    comment.likes--;
}

const showReplyBox = ref(
  Array.from({ length: comments.value.length }, () => false)
)
const replyContent = ref('')
// 显示/隐藏回复框
const toggleReplyBox = (index) => {
  if(userStore.token==='')  {
    router.push('/login')
    return
  }
  showReplyBox.value[index] = !showReplyBox.value[index]
}

// 添加回复
const addReply = (id,index) => {
  if (replyContent.value.trim() !== '') {
    comments.value[index].replies.push({
      name: userStore.user.username,
      avatar: userStore.user.avatar,
      time: new Date(),
      content: replyContent.value,
    })
    replyContent.value=''
    showReplyBox.value[index]= false
  }
}
</script>

<template>
  <div class="main">
    <div class="comment-title">
      <span>{{ route.query.bookName }}书评区</span>
      <p>请自觉维护社区环境哦~</p>
    </div>
    <div class="comment-section">
      <!-- 评论列表 -->
      <div class="comment" v-for="(comment,index) in comments" :key="comment.id">
        <div class="comment-header">
          <img :src="comment.avatar" alt="头像" class="comment-avatar" />
          <div class="comment-info">
            <span class="comment-name">{{ comment.name }}</span>
            <span class="comment-time">{{ formatTime(comment.time) }}</span>
          </div>
        </div>
        <div class="comment-body">
          <p>{{ comment.content }}</p>
        </div>
        <div class="comment-footer">
          <span v-if="comment.isLike!==false" @click="likeComment(comment.id)" class="like-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dianzanshoucang"></use>
            </svg>
          </span>
          <span v-else @click="likeComment(comment.id)">
             <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dianzan"></use>
            </svg>
          </span>
          <span class="like-num">
            {{ comment.likes }}
          </span>
          <button class="reply-btn" @click="toggleReplyBox(comment.id)">回复</button>
        </div>
        <!-- 回复框 -->
        <div v-if="showReplyBox[index+1]" class="reply-box">
          <span class="avatar"><el-avatar :size="50" :src="myAvatar" /></span>
          <span><el-input
            v-model="replyContent"
            style="width: 540px"
            maxlength="200"
            :autosize="{ minRows: 2, maxRows: 2 }"
            show-word-limit
            type="textarea"
            placeholder="Please input"
          /></span>
          <button class="reply-btn" @click="addReply(comment.id,index)">提交回复</button>
        </div>
        <!-- 回复列表 -->
        <div class="replies" v-if="comment.replies.length">
          <div v-for="(reply, replyIndex) in comment.replies" :key="replyIndex" class="reply">
            <div class="reply-header">
              <img :src="reply.avatar" alt="头像" class="reply-avatar" />
              <div class="reply-info">
                <span class="reply-name">{{ reply.name }}</span>
                <span class="reply-time">{{ formatTime(reply.time) }}</span>
              </div>
            </div>
            <p class="reply-content">{{ reply.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 750px;
  border: 1px solid #dfdede;
  margin: 40px auto 0;
}

.comment-title {
  height: 90px;
  border-bottom: 1px solid #dfdede;
  text-align: center; /* 水平居中 */
  position: relative;

  span {
    display: inline-block;
    font-size: 30px;
    margin-top: 24px;
    font-family: '华文楷体', serif;
  }

  p {
    position: absolute;
    right: 10px;
    bottom: -10px;
    color: #9f9f9f;
    font-family: '华文中宋', serif;
  }
}

.comment-section {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  font-family: Arial, sans-serif;

  .comment {
    border-bottom: 1px solid #ddd;
    padding: 16px;
    margin-bottom: 16px;

    .comment-header {
      display: flex;
      align-items: center;

      .comment-avatar {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 8px;
      }

      .comment-info {
        margin: 3px 7px;
        display: flex;
        flex-direction: column;
      }

      .comment-name {
        color: #9f9f9f;
        font-family: '黑体', serif;
      }

      .comment-time {
        margin-top: 4px;
        font-size: 13px;
        color: #888;
      }
    }

    .comment-body {
      margin: 12px 0;
    }

    .comment-footer {
      display: flex;
      gap: 5px;

      .icon{
        height: 25px;
        width: 25px;
        color: #6c6b6b;
      }

      .like-num{
        margin-top: 4px;
      }
      .reply-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #9da2a8;
      }

    }
  }

  .reply-box {
    margin-top: 12px;
    margin-left: 50px;
    .avatar{
      margin-right: 20px;
    }

    .reply-btn{
      margin-top: 10px;
      margin-left: 70px;
      width: 80px;
      height: 35px;
      line-height: 25px;
      align-content: center;
      background-color: #19bad8;
      color: white;
      border: none;
      font-size: 15px;
      border-radius: 6px;
      opacity: 0.7;
    }
    .reply-btn:hover{
      opacity: 1;
    }
  }

  .replies {
    margin-top: 12px;
    padding-left: 16px;
    border-left: 2px solid #ddd;
    margin-left: 50px;

    .reply{
      .reply-header {
        display: flex;
        align-items: center;

        .reply-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 8px;
        }
        .reply-info {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
        }
        .reply-name {
          color: #9f9f9f;
          font-family: '黑体', serif;
          font-size: 14px;
          margin-top: 5px;
        }
        .reply-time {
          font-size: 12px;
          color: #888;
          margin-top: 5px;
        }
      }
      .reply-content {
        margin-top: 10px;
        font-size: 15px;
      }
    }

  }
}

</style>
