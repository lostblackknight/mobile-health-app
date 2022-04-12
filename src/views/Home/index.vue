<template>
  <div class="container">
    <van-sticky>
      <!-- 导航栏 -->
      <div class="nav-bar">
        <!-- 导航栏头部 -->
        <div class="nav-bar-top">
          <!-- 左侧城市盒子 -->
          <div class="location-box">
            <location-box :city="city" @click="handleClick"/>
          </div>
          <!-- 右侧 logo -->
          <div class="logo">
            <van-icon class="logo" :name="logo"/>
          </div>
        </div>
        <!-- 导航栏底部搜索栏 -->
        <div class="search-bar">
          <search-bar :city="city"/>
        </div>
      </div>
    </van-sticky>
    <!-- 服务区 -->
    <div class="service-area">
      <service-area/>
    </div>
    <!-- 标题 -->
    <div class="title">
      <span>健康推荐</span>
    </div>
    <!-- 列表视图 -->
    <div class="list-view">
      <list-view/>
    </div>
    <!-- 弹出层-省市区选择器 -->
    <van-popup
      position="bottom"
      @opened="handleOpened"
      @closed="handleClosed"
      v-model="showLocationSelector">
      <van-area
        ref="area"
        :area-list="areaList"
        :value="value"
        :title="'当前城市: ' + (city.name === undefined ? '未知': city.name)"
        :columns-num="2"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import LocationBox from '@/views/Home/CityBox'
import SearchBar from '@/views/Home/SearchBar'
import ServiceArea from '@/views/Home/ServiceArea'
import ListView from '@/views/Home/ArticleListView'
import logo from '@/assets/logo-w.png'
import { areaList } from '@vant/area-data'

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
      city: {
        code: '140400',
        name: '长治市'
      },
      logo: logo,
      showLocationSelector: false,
      areaList: areaList,
      value: ''
    }
  },
  methods: {
    handleClick() {
      this.showLocationSelector = true
    },
    handleConfirm(location) {
      this.city = location[location.length - 1]
      this.showLocationSelector = false
    },
    handleCancel() {
      this.showLocationSelector = false
    },
    handleOpened() {
      this.value = this.city.code
    },
    handleClosed() {
      this.value = ''
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

  ::v-deep .van-popup__close-icon
    color: black

  ::v-deep .van-picker__title
    font-weight: 550
    color: rgba(0, 0, 0, 0.78)
</style>
