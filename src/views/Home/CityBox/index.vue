<template>
  <div class="container" @click="handleClick">
    <van-icon class="left-icon" name="location" color="#f7f8fa"/>
    <span class="location" v-if="city !== undefined & city.name !== undefined & city.code !== undefined">{{ city.name }}</span>
    <span class="location" v-else>未知</span>
    <van-icon class="right-icon" name="arrow-down" color="#f7f8fa"/>
  </div>
</template>

<script>

export default {
  name: 'CityBox',
  props: ['city'],
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
