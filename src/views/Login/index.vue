<template>
  <div class="container">
    <!-- 头部 -->
    <!--<div class="header">-->
    <!--  <van-icon class="close" name="cross" @click="handleClose"/>-->
    <!--  <van-icon class="logo" :name="logo"/>-->
    <!--</div>-->
    <!-- 标题 -->
    <div class="title">
      <span>欢迎登录小蜜蜂医疗</span>
    </div>
    <!-- 登录表单 -->
    <div class="login-form">
      <van-form ref="loginForm" v-if="loginType === 'phone-password'" @submit="handleSubmit" :show-error="false">
        <van-cell-group inset>
          <van-field
            v-model="phone"
            type="tel"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            :rules="[{ validator: phoneValidator, trigger: 'onChange', message: '请输入正确的手机号'}]"
            clearable
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            :rules="[{ validator: passwordValidator, trigger: 'onChange', message: '请输入正确的密码' }]"
            placeholder="请输入密码"
            clearable
          />
        </van-cell-group>
        <div style="margin: 40px;">
          <van-button :disabled="disabledLoginButton" round block color="#2d70fc" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
      <van-form v-if="loginType === 'phone-code'" @submit="handleSubmit" :show-error="false">
        <van-cell-group inset>
          <van-field
            v-model="phone"
            type="tel"
            name="phone"
            label="手机号"
            placeholder="请输入手机号"
            clearable
            :rules="[{ validator: phoneValidator, trigger: 'onChange', message: '请输入正确的手机号'}]"
          />
        </van-cell-group>
        <div class="tip">
          <span>未注册的手机号验证后自动创建账户</span>
        </div>
        <div style="margin: 40px;">
          <van-button round block color="#2d70fc" native-type="submit">
            获取短信验证码
          </van-button>
        </div>
      </van-form>
    </div>
    <!-- 尾部 -->
    <div class="footer">
      <span v-if="loginType === 'phone-password'" data-login-type="phone-code" @click="handleChange">验证码登录</span>
      <span v-if="loginType === 'phone-code'" data-login-type="phone-password" @click="handleChange">密码登录</span>
    </div>
    <!-- 弹出层-短信验证码 -->
    <van-popup
      @closed="handlePopupClosed"
      @opened="handlePopupOpened"
      transition="enter-to-class"
      :style="{ height: '100%', width: '100%' }"
      closeable
      :overlay="false"
      v-model="showSmsCode"
      close-icon-position="top-left"
      close-icon="arrow-left">
      <sms-code ref="smsCode" :phone="phone"/>
    </van-popup>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import SmsCode from '@/views/Login/SmsCode'
import { sendCode } from '@/api/member'

export default {
  name: 'Login',
  components: { SmsCode },
  data() {
    return {
      phone: '17735746553',
      password: '123456',
      logo: logo,
      showSmsCode: false,
      loginType: 'phone-password',
      destroySmsCode: false,
      disabledLoginButton: false
    }
  },
  methods: {
    phoneValidator(val) {
      return this.validatePhone(val)
    },
    passwordValidator(val) {
      return this.validatePassword(val)
    },
    validatePhone(phone) {
      return phone.length === 11
    },
    validatePassword(password) {
      return password.length > 0
    },
    handleSubmit() {
      switch (this.loginType) {
        case 'phone-code':
          sendCode(this.phone)
            .then(() => {
              if (this.$refs.smsCode === undefined || this.$refs.smsCode.countdown === 60) {
                this.$toast('发送验证码')
              }
              this.showSmsCode = true
            }).catch(() => {
              // 获取验证码频率太高
              this.showSmsCode = true
            })
          break
        case 'phone-password':
          // 校验用户名和密码登录
          this.$store.dispatch('member/login', {
            username: this.phone,
            password: this.password
          })
            .then(() => {
              this.$toast('登录成功')
              this.$router.push({ path: '/' }).catch(() => {
              })
            })
            .catch((error) => {
              this.$toast(error.message)
            })
          break
      }
    },
    handleClose() {
      this.$router.go(-1)
    },
    handleChange({ target }) {
      switch (target.getAttribute('data-login-type')) {
        case 'phone-code':
          this.loginType = 'phone-code'
          break
        case 'phone-password':
          this.loginType = 'phone-password'
          break
      }
    },
    handlePopupClosed() {
      this.$refs.smsCode.code = ''
      if (this.$refs.smsCode.countdown < 0) {
        this.$refs.smsCode.countdown = 60
      }
    },
    handlePopupOpened() {
      if (this.$refs.smsCode.countdown === 60) {
        this.$refs.smsCode.setTime()
      }
      this.$refs.smsCode.showKeyboard = true
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background-color: #f7f8fa

  .header
    height: 50px
    background-color: white

    .close
      position: absolute
      left: 16px
      top: 16px

    .logo
      position: absolute
      right: 16px
      top: 16px

  .title
    text-align: center
    font-size: 24px
    margin-top: 80px

  .login-form
    margin-top: 60px

    .tip
      color: grey
      font-size: 12px
      margin: 10px 0 20px 32px

  .footer
    text-align: center
    font-size: 12px
    color: grey

  ::v-deep .van-popup__close-icon
    color: black
</style>
