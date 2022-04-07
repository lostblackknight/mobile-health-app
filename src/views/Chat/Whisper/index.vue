<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="陈医生"
        fixed
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Whisper',
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
