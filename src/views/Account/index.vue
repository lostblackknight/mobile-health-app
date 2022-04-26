<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="设置"
        fixed
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="main">
      <div class="item">
        <van-cell title="个人资料" is-link to="/profile"/>
      </div>
      <div class="item">
        <van-cell title="账号与安全" is-link to="/account/security"/>
      </div>
      <div class="item">
        <van-cell title-class="center" @click="handleLogout" title="退出登录" clickable/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Account',
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    handleLogout() {
      this.$store.dispatch('member/logout')
        .then(() => {
          this.$router.push(`/login`)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  background-color: #f7f8fa
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0

  .center
    text-align: center

  .main
    margin-top: 46px

    .item
      margin-top: 10px

</style>
