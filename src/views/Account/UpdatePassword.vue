<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="修改密码"
        fixed
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="main">
      <van-form @submit="onSubmit">
        <van-field
          label="新密码"
          name="password"
          v-model="value"
          placeholder="请输入新密码"
          :rules="[{ required: true, message: '密码不能为空' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { modifyMember } from '@/api/member'

export default {
  name: 'UpdatePassword',
  data() {
    return {
      value: '',
      id: undefined
    }
  },
  created() {
    this.id = this.$route.params.id
  },
  methods: {
    onSubmit() {
      const member = {
        id: this.id,
        password: this.value
      }
      modifyMember(member)
        .then(({ message }) => {
          this.$toast(message)
          this.$store.dispatch('member/logout')
            .then(() => {
              this.$router.push(`/login`)
            })
        })
        .catch(({ message }) => {
          this.$toast(message)
        })
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  .main
    margin-top: 46px
</style>
