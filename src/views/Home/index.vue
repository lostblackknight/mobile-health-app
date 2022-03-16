<template>
  <div class="container">
    <van-sticky>
      <div class="nav-bar">
        <div class="nav-bar-top">
          <div class="location-box" >
            <location-box :location="location" @click="handleClick"/>
          </div>
          <div class="logo">
            <van-icon class="logo" :name="logo"/>
          </div>
        </div>
        <div class="search-bar">
          <search-bar :location="location"/>
        </div>
      </div>
    </van-sticky>
    <div class="service-area">
      <service-area/>
    </div>
    <div class="title">
      <span>健康推荐</span>
    </div>
    <div class="list-view">
      <list-view/>
    </div>
  </div>
</template>

<script>
import LocationBox from '@/views/Home/LocationBox'
import SearchBar from '@/views/Home/SearchBar'
import ServiceArea from '@/views/Home/ServiceArea'
import ListView from '@/views/Home/ListView'
import logo from '@/assets/logo-w.png'

export default {
  name: 'Home',
  components: {
    ListView,
    ServiceArea,
    LocationBox,
    SearchBar
  },
  data() {
    return {
      location: {
        province: '山西',
        city: '长治'
      },
      logo
    }
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: '/City',
        query: { ...this.location }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  background-color: #f7f8fa

  .nav-bar
    height: 110px
    background-color: #2d70fc

    .nav-bar-top
      height: 44px

      .location-box
        position: absolute
        left: 10px
        top: 16px

      .logo
        position: absolute
        right: 10px
        top: 10px

  .service-area
    margin: 6px 8px 0 8px

  .title
    margin: 10px 0 10px 12px

    span
      font-weight: 550
      color: rgba(0, 0, 0, 0.81)
</style>
