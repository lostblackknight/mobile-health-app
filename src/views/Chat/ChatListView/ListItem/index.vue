<template>
  <div class="container" @click="handleClick">
    <van-swipe-cell>
      <div class="chat-bar">
        <van-row>
          <van-col span="4">
            <div class="chat-avatar">
              <van-image round width="100%" height="100%" :src="item.avatar"/>
            </div>
          </van-col>
          <van-col span="16">
            <div class="chat-name"><span>{{ item.nickName }}</span></div>
            <div class="chat-last-msg"><span>{{ lastMessage.content }}</span></div>
          </van-col>
          <van-col span="4">
            <div class="chat-last-time"><span>{{ formatter(lastMessage.sendTime) }}</span></div>
            <div v-if="unsignedCount !== 0" class="unsigned-count"><span>{{ unsignedCount }}</span></div>
          </van-col>
        </van-row>
      </div>
      <!--<template #right>-->
      <!--  <van-button class="set-btn" color="#fe9c00" square text="标记为已读"/>-->
      <!--  <van-button class="del-btn" color="#ff5a68" square text="删除"/>-->
      <!--</template>-->
    </van-swipe-cell>
  </div>
</template>

<script>
import { getLastMessageDetail, getUnsignedMessage } from '@/api/message'
import moment from 'moment'

export default {
  name: 'ListItem',
  props: ['item'],
  created() {
    this.getUnsigned()
    this.getLastMessageDetail()
  },
  data() {
    return {
      unsignedCount: 0,
      lastMessage: {},
      unsignedMessage: []
    }
  },
  methods: {
    getUnsigned() {
      getUnsignedMessage(this.item.memberId, this.item.anotherId)
        .then(({ data }) => {
          this.unsignedCount = data.length
          this.unsignedMessage = data
        })
    },
    formatter(date) {
      // eslint-disable-next-line new-cap
      return new moment(date).format('yyyy-MM-DD')
    },
    getLastMessageDetail() {
      getLastMessageDetail(this.item.memberId, this.item.anotherId)
        .then(({ data }) => {
          this.lastMessage = data
        })
    },
    handleClick() {
      this.$emit('click', this.item, this.unsignedMessage)
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
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      color: rgba(128, 128, 128, 0.62)

    .chat-last-time
      margin-top: 10px
      font-size: 12px
      color: rgba(128, 128, 128, 0.52)

    .unsigned-count
      font-size: 11px
      background-color: #ee0a24
      border-radius: 50%
      position: relative
      left: 40px
      top: 12px
      width: 14px
      height: 14px
      padding: 1px
      text-align: center
      line-height: 14px
      color: white

  .del-btn
    height: 100%

  .set-btn
    height: 100%

</style>
