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
import { getList } from '@/utils/cache'

export default {
  name: 'SearchBar',
  props: ['city'],
  data() {
    return {
      value: '',
      hot: getList('search-history') === null ? '请输入搜索关键词' : getList('search-history')[getList('search-history').length - 1]
    }
  },
  methods: {
    handleFocus() {
      if (this.city !== undefined && this.city.name !== undefined && this.city.code !== undefined) {
        this.$router.push({
          path: '/search',
          query: {
            city: this.city.name
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
