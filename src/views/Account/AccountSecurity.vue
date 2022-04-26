<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="账号与安全"
        fixed
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="main">
      <van-cell-group>
        <van-cell title="修改密码" is-link :to="`/account/security/password/${member.id}`"/>
        <van-cell title="医生认证" is-link :to="`/account/security/doctor/auth/${member.id}`" :value="showStatus(member.status)"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getMemberById } from '@/api/member'

export default {
  name: 'AccountSecurity',
  data() {
    return {
      member: {
        avatar: undefined,
        certificatesNumber: undefined,
        createTime: undefined,
        id: undefined,
        isDeleted: undefined,
        nickName: undefined,
        password: undefined,
        phone: undefined,
        realName: undefined,
        roles: undefined,
        status: undefined,
        updateTime: undefined,
        username: undefined
      }
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    showStatus(status) {
      switch (status) {
        case 0:
          return '未认证'
        case 1:
          return '已认证'
        case -1:
          return '认证中'
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    getProfile() {
      getMemberById()
        .then(({ data }) => {
          this.member = data
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  .main
    margin-top: 46px
</style>
