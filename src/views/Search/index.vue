<template>
  <div>
    <van-nav-bar
      title="选择地区"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>

export default {
  name: 'Search',
  data() {
    return {
      activeKey: 0
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
