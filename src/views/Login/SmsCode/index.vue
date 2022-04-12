<template>
  <div class="container">
    <div class="header">
      <van-icon class="logo" :name="logo"/>
    </div>
    <div class="title">
      <span>输入验证码</span>
    </div>
    <div class="tip">
      <span><span>验证码已发送至</span> {{ phone }}</span>
    </div>
    <div>
      <van-password-input
        :value="code"
        :focused="showKeyboard"
        :length="4"
        :gutter="10"
        :mask="false"
        @focus="showKeyboard = true"
      />
      <div class="tip2" v-if="countdown >= 0">
        <span>{{ countdown }} 秒后重新获取验证码</span>
      </div>
      <div class="tip2" v-if="countdown < 0">
        <span>点击左上角返回，重新获取验证码</span>
      </div>
      <van-number-keyboard
        v-model="code"
        :show="showKeyboard"
        @blur="showKeyboard = false"
      />
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'

export default {
  name: 'SmsCode',
  props: ['phone'],
  data() {
    return {
      code: '',
      showKeyboard: true,
      logo: logo,
      countdown: 60,
      timer: null
    }
  },
  beforeDestroy() {
    if (this.timer != null) {
      clearTimeout(this.timer)
      this.timer = null
    }
  },
  methods: {
    setTime() {
      if (this.countdown < 0) {
        if (this.timer != null) {
          clearTimeout(this.timer)
          this.timer = null
          return
        }
      } else {
        this.countdown--
      }
      this.timer = setTimeout(this.setTime, 1000)
    }
  },
  watch: {
    code(code) {
      if (code.length === 4) {
        // console.log({ code })
        // 校验验证码登录
        this.$store.dispatch('member/loginBySms', {
          phone: this.phone,
          code: code
        })
          .then(() => {
            this.$toast('登录成功')
            this.$router.push({ path: '/' }).catch(() => {
            })
          })
          .catch((error) => {
            this.$toast(error.message)
          })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100vw
  height: 100vh
  background-color: #f7f8fa

  .header
    height: 50px
    background-color: white

    .logo
      position: absolute
      right: 0.53333rem
      top: 0.53333rem

  .title
    font-size: 32px
    margin: 50px 0 20px 30px

  .tip
    margin: 0 0 20px 30px

    span
      font-size: 18px

      span
        color: grey
        font-size: 14px

  .tip2
    margin: 30px 0 20px 30px
    font-size: 14px
    color: grey

</style>
