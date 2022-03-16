<template>
  <div class="container" @click="handleClick">
    <van-icon class="left-icon" name="location" color="#f7f8fa"/>
    <span class="location" v-if="location">{{ location.province }}·{{ location.city }}</span>
    <span class="location" v-if="!location">未知</span>
    <van-icon class="right-icon" name="arrow-down" color="#f7f8fa"/>
  </div>
</template>

<script>

export default {
  name: 'LocationBox',
  props: {
    location: {
      default: undefined,
      type: Object
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  width: fit-content
  background-color: #2d70fc !important

  .location
    color: #f7f8fa
    font-size: 18px
    font-weight: 550

  .left-icon
    margin-right: 2px

  .right-icon
    margin-left: 2px
</style>
