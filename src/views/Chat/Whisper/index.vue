<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        :title="to.nickName"
        fixed
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="message-box">
      <div v-for="msg in msgList" :key="msg.id">
        <div v-if="msg.fromId === fromId" class="message-item right">
          <van-row type="flex" justify="end">
            <van-col>
              <div class="name name-right">{{ from.nickName }}</div>
              <div class="content">
                {{ msg.content }}
              </div>
            </van-col>
            <van-col>
              <div class="avatar">
                <van-image width="100%" height="100%" :src="from.avatar"/>
              </div>
            </van-col>
          </van-row>
        </div>
        <div v-if="msg.fromId !== fromId" class="message-item left">
          <van-row>
            <van-col>
              <div class="avatar">
                <van-image width="100%" height="100%" :src="to.avatar"/>
              </div>
            </van-col>
            <van-col>
              <div class="name name-left">{{ to.nickName }}</div>
              <div class="content">
                {{ msg.content }}
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <div class="message-send">
      <div class="msg-input">
        <van-row>
          <van-col span="20">
            <van-cell-group style="width: 100%">
              <van-field @keyup.enter="send" v-model="msg" @click="handleFocus" placeholder="发送消息"/>
            </van-cell-group>
          </van-col>
          <van-col span="4">
            <van-button :type="this.msg.length > 0 ? 'info' : 'default'" @click="send">发送</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getMemberById } from '@/api/member'
import { getMessageList, getUnsignedMessage, signMessage } from '@/api/message'

export default {
  name: 'Whisper',
  data() {
    return {
      msg: '',
      msgList: [],
      fromId: undefined,
      toId: undefined,
      from: {
        nickName: null,
        avatar: null
      },
      to: {
        nickName: null,
        avatar: null
      },
      socket: null
    }
  },
  destroyed() {
    this.socket.close()
  },
  created() {
    this.fromId = Number(this.$route.params.fromId)
    this.toId = Number(this.$route.params.toId)
    // 查询聊天用户信息
    getMemberById(this.fromId)
      .then(({ data }) => {
        this.from = data
        getMemberById(this.toId)
          .then(({ data }) => {
            this.to = data
            // 获取消息列表
            this.getMessageList()
          })
      })
    // ws
    this.handleWebSocket()
  },
  methods: {
    getMessageList() {
      getMessageList(this.fromId, this.toId)
        .then(({ data }) => {
          this.msgList = data
          // 滚动到底部
          this.scrollToBottom()
          // 签收消息
          getUnsignedMessage(this.fromId, this.toId)
            .then(({ data }) => {
              // 签收消息
              signMessage(data.map(item => item.id))
            })
        })
    },
    handleWebSocket() {
      if (this.socket != null && this.socket.readyState === WebSocket.OPEN) {
        return
      }
      this.socket = new WebSocket(`ws://localhost:7001/api/message/ws/chat/${this.fromId}`)
      this.socket.onopen = () => {
        console.log('ws 建立连接')
      }
      this.socket.onmessage = (e) => {
        const msgResult = JSON.parse(e.data)
        this.msgList.push(msgResult)
        // 签收消息
        const model = {
          action: 1,
          msg: {
            fromId: this.fromId,
            toId: this.toId,
            ids: [msgResult.id]
          },
          extend: null
        }
        this.socket.send(JSON.stringify(model))
        this.msg = ''
        this.scrollToBottom()
      }
      this.socket.onclose = () => {
        console.log('ws 关闭连接')
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    handleFocus() {
      this.scrollToBottom()
    },
    send() {
      if (this.msg.length !== 0) {
        const msgModel = {
          fromId: this.fromId,
          toId: this.toId,
          content: this.msg,
          type: 0,
          sendTime: new Date(),
          status: 0
        }
        const model = {
          action: 0,
          msg: msgModel,
          extend: null
        }
        this.socket.send(JSON.stringify(model))
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const domWrapper = document.querySelector('.message-box') // 外层容器 出现滚动条的dom
        if (domWrapper !== null) {
          (function smoothscroll() {
            const currentScroll = domWrapper.scrollTop // 已经被卷掉的高度
            const clientHeight = domWrapper.offsetHeight // 容器高度
            const scrollHeight = domWrapper.scrollHeight // 内容总高度
            if (scrollHeight - 10 > currentScroll + clientHeight) {
              window.requestAnimationFrame(smoothscroll)
              domWrapper.scrollTo(0, currentScroll + (scrollHeight - currentScroll - clientHeight) / 2)
            }
          })()
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0

  .message-box
    position: relative
    top: 46px
    height: 540px
    overflow: auto
    background-color: #f7f8fa

    &::-webkit-scrollbar
      display: none

    .message-item
      margin: 0 0 20px 0

      &:first-child
        margin-top: 10px

      .avatar
        width: 50px
        height: 50px

      .name
        font-size: 14px
        color: #777777
        margin-top: 6px

      .content
        margin-top: 8px
        border-radius: 4px
        padding: 6px
        font-size: 16px
        max-width: 200px
        background-color: rgba(195, 195, 195, 0.36)

    .left
      margin-left: 10px

    .right
      margin-right: 10px

    .name-left
      text-align: left

    .name-right
      text-align: right

  .message-send
    position: absolute
    bottom: 0
    left: 0
    right: 0

    .msg-input
      background-color: #f7f8fa
      width: 100%

  ::v-deep .van-image__img
    border-radius: 20px
</style>
