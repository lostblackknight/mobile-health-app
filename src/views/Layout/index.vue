<template>
  <div>
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
    <van-tabbar route v-model="active" @change="handleChange" active-color="#2d70fc">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/health" icon="like-o">健康</van-tabbar-item>
      <van-tabbar-item to="/chat" icon="chat-o" :badge="unsignedCount === 0 ? '' : unsignedCount">消息</van-tabbar-item>
      <van-tabbar-item to="/about" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getAllUnSignedMessage } from '@/api/message'

export default {
  name: 'Layout',
  created() {
    getAllUnSignedMessage()
      .then(({ data }) => {
        this.unsignedCount = data.length
      })
  },
  data() {
    return {
      active: 0,
      unsignedCount: 0
    }
  },
  methods: {
    handleChange() {
      getAllUnSignedMessage()
        .then(({ data }) => {
          this.unsignedCount = data.length
        })
    }
  }
}
</script>
