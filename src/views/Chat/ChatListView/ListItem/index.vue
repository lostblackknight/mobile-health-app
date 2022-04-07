<template>
  <div class="container" @click="handleClick">
    <van-swipe-cell>
      <div class="chat-bar">
        <van-row>
          <van-col span="4">
            <div class="chat-avatar">
              <van-image round width="100%" height="100%" src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
            </div>
          </van-col>
          <van-col span="16">
            <div class="chat-name"><span>陈医生</span></div>
            <div class="chat-last-msg"><span>祝您早日康复！</span></div>
          </van-col>
          <van-col span="4">
            <div class="chat-last-time"><span>昨天 23:09</span></div>
          </van-col>
        </van-row>
      </div>
      <template #right>
        <van-button class="set-btn" color="#4c93fb" square text="置顶"/>
        <van-button class="set-btn" color="#fe9c00" square text="标记为已读"/>
        <van-button class="del-btn" color="#ff5a68" square text="删除"/>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  background-color: #f7f8fa
  border-bottom: 0.1px solid #f3f3f3

  .chat-bar
    height: 64px

    .chat-avatar
      margin-top: 9.5px
      margin-left: 9.5px
      height: 45px
      width: 45px

    .chat-name
      margin-top: 8px
      font-size: 18px

    .chat-last-msg
      margin-top: 5px
      font-size: 12px
      color: rgba(128, 128, 128, 0.62)

    .chat-last-time
      margin-top: 10px
      font-size: 12px
      color: rgba(128, 128, 128, 0.52)

  .del-btn
    height: 100%

  .set-btn
    height: 100%

</style>
