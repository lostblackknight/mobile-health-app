<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="消息中心"
        right-text="全部已读"
        fixed
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
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
    },
    onClickRight() {
      console.log('全部已读')
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  .chat-list
    margin-top: 46px
</style>
