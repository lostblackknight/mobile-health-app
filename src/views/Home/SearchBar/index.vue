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
  props: ['city'],
  data() {
    return {
      value: '',
      hot: '核酸检测在线预约'
    }
  },
  methods: {
    handleFocus() {
      if (this.city !== undefined && this.city.name !== undefined && this.city.code !== undefined) {
        this.$router.push({
          path: '/search',
          query: {
            city_name: this.city.name,
            city_code: this.city.code
          }
        })
      } else {
        this.$router.push({
          path: '/search'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
