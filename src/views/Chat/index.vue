<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="消息中心"
        fixed
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="chat-list">
      <chat-list-view/>
    </div>
  </div>
</template>

<script>
import ChatListView from '@/views/Chat/ChatListView'

export default {
  name: 'Chat',
  components: { ChatListView },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  .chat-list
    margin-top: 46px
</style>
