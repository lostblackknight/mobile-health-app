<template>
  <div class="container">
    <van-grid :column-num="3" :gutter="6">
      <van-grid-item
        v-for="service in services"
        :key="service.id"
        :icon="service.icon"
        :text="service.text"
        :badge="service.badge"
        :to="service.to"
        :url="service.url"
        @click="handleClick(service.id)"
      />
    </van-grid>
  </div>
</template>

<script>

export default {
  name: 'ServiceArea',
  props: ['city'],
  data() {
    return {
      services: [
        {
          id: 1,
          icon: 'https://jksx-component.oss-cn-huhehaote.aliyuncs.com/upload_962ced976db23b55a78f8871ca672db9.png',
          text: '问医生',
          badge: '',
          to: `/search?keyword=医生&city=${this.city.name}`,
          url: ''
        },
        {
          id: 2,
          icon: 'https://s2.loli.net/2022/04/07/4zbQYvXtrx3asnc.png',
          text: '挂号',
          badge: '',
          to: `/search?keyword=医院&city=${this.city.name}`,
          url: ''
        },
        {
          id: 3,
          icon: 'https://jksx-component.oss-cn-huhehaote.aliyuncs.com/upload_25a31d0ccc84df05b3d1335604d8b921.png',
          text: '缴费',
          badge: '',
          to: `/payment`,
          url: ''
        },
        {
          id: 4,
          icon: 'https://jksx-component.oss-cn-huhehaote.aliyuncs.com/upload_426991b1eddf622e60f56c2865d73a97.png',
          text: '医院导航',
          badge: '',
          to: '/navigation',
          url: ''
        },
        {
          id: 7,
          icon: 'https://jksx-component.oss-cn-huhehaote.aliyuncs.com/upload_d12b11632ef5689a1648ddc46a570b07.png',
          text: '健康指导',
          badge: '',
          to: '/health',
          url: ''
        }
      ]
    }
  },
  methods: {
    handleClick(id) {
      switch (id) {
        case 1:
          this.$store.dispatch('search/setActive', 3)
          break
        case 2:
          this.$store.dispatch('search/setActive', 1)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  ::v-deep .van-grid-item__content
    border-radius: 8px

</style>
