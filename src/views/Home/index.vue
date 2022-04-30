<template>
  <div class="container">
    <van-sticky>
      <!-- 导航栏 -->
      <div class="nav-bar">
        <!-- 导航栏头部 -->
        <div class="nav-bar-top">
          <van-row>
            <van-col>
              <!-- 左侧城市盒子 -->
              <div class="location-box">
                <location-box :city="city" @click="handleClick"/>
              </div>
            </van-col>
            <van-col>
              <!-- 右侧 logo -->
              <div class="logo">
                <van-icon class="logo" :name="logo"/>
              </div>
            </van-col>
          </van-row>
        </div>
        <!-- 导航栏底部搜索栏 -->
        <div class="search-bar">
          <search-bar :city="city"/>
        </div>
      </div>
    </van-sticky>
    <!-- 服务区 -->
    <div class="service-area">
      <service-area :city="city"/>
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
import ListView from '@/views/Search/ArticleListView'
import logo from '@/assets/logo-w.png'
import { areaList } from '@vant/area-data'
import AMapLoader from '@amap/amap-jsapi-loader'

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
        code: '',
        name: ''
      },
      logo: logo,
      showLocationSelector: false,
      areaList: areaList,
      value: ''
    }
  },
  created() {
    this.loadLocation()
  },
  methods: {
    loadLocation() {
      window._AMapSecurityConfig = {
        securityJsCode: '5de61f73c434cbed2c68ae4001276c7f'
      }

      AMapLoader.load({
        key: 'c46c1744e87ec48659b517ddb50a1419',
        version: '2.0',
        plugins: ['AMap.CitySearch']
      }).then((AMap) => {
        const citySearch = new AMap.CitySearch()
        citySearch.getLocalCity((status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            console.log(result)
            const { adcode, city } = result
            this.city.code = adcode
            this.city.name = city
          }
        })
      })
    },
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
        font-size: 16px

      .logo
        position: absolute
        right: 10px
        top: 10px
        font-size: 16px

  .service-area
    margin: 16px 8px 0 8px

  .title
    margin: 10px 0 10px 12px
    font-size: 22px

    span
      font-weight: 550
      color: rgba(0, 0, 0, 0.81)

  ::v-deep .van-popup__close-icon
    color: black

  ::v-deep .van-picker__title
    font-weight: 550
    color: rgba(0, 0, 0, 0.78)
</style>
