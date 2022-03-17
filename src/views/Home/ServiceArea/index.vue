<template>
  <div class="container">
    <van-grid :column-num="4" :gutter="6">
      <van-grid-item
        v-for="service in services"
        :key="service.id"
        :icon="service.icon"
        :text="service.text"
        :badge="service.badge"
        :to="service.to"
        :url="service.url"
      />
    </van-grid>
  </div>
</template>

<script>

export default {
  name: 'ServiceArea',
  data() {
    return {
      services: [
        {
          id: 1,
          icon: 'photo-o',
          text: '急速咨询',
          badge: '',
          to: '/health',
          url: ''
        },
        {
          id: 2,
          icon: 'photo-o',
          text: '缴费',
          badge: '',
          to: '',
          url: ''
        },
        {
          id: 3,
          icon: 'photo-o',
          text: '影响·报告',
          badge: '',
          to: '',
          url: ''
        },
        {
          id: 4,
          icon: 'photo-o',
          text: '处方',
          badge: '',
          to: '',
          url: ''
        },
        {
          id: 5,
          icon: 'photo-o',
          text: '住院服务',
          badge: '',
          to: '',
          url: ''
        },
        {
          id: 6,
          icon: 'photo-o',
          text: '核酸检测',
          badge: '',
          to: '',
          url: ''
        },
        {
          id: 7,
          icon: 'photo-o',
          text: '新冠疫苗',
          badge: '',
          to: '',
          url: ''
        },
        {
          id: 8,
          icon: 'photo-o',
          text: '药品器械',
          badge: '',
          to: '',
          url: ''
        },
        {
          id: 9,
          icon: 'photo-o',
          text: '病历本',
          badge: '',
          to: '',
          url: ''
        },
        {
          id: 10,
          icon: 'photo-o',
          text: '慢病服务',
          badge: '',
          to: '',
          url: ''
        },
        {
          id: 11,
          icon: 'photo-o',
          text: '医护上门',
          badge: '',
          to: '',
          url: ''
        },
        {
          id: 12,
          icon: 'photo-o',
          text: '心里咨询',
          badge: '',
          to: '',
          url: ''
        },
        {
          id: 13,
          icon: 'photo-o',
          text: '医疗美容',
          badge: '',
          to: '',
          url: ''
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  ::v-deep .van-grid-item__content
    border-radius: 8px

</style>
