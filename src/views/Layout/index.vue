<template>
  <div>
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
    <van-tabbar route v-model="active" active-color="#2d70fc">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/health" icon="like-o">健康</van-tabbar-item>
      <van-tabbar-item replace to="/chat" icon="chat-o" badge="5">消息</van-tabbar-item>
      <van-tabbar-item replace to="/about" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      active: 0
    }
  }
}
</script>
