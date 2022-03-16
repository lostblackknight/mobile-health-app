<template>
  <div>
    <van-search
      v-model="value"
      shape="round"
      :background="'#2d70fc'"
      :placeholder="hot"
      @focus="handleFocus"
    >
    </van-search>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    location: {
      default: () => {
        return {
          province: '',
          city: ''
        }
      },
      type: Object
    }
  },
  data() {
    return {
      value: '',
      hot: '核酸检测在线预约'
    }
  },
  methods: {
    handleFocus() {
      const {
        province,
        city
      } = this.location
      this.$router.push(`/search?province=${province}&city=${city}`)
    }
  }
}
</script>

<style scoped>

</style>
