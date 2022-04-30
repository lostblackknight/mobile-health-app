<template>
  <div>
    <van-search
      v-model="keyword"
      id="tip-input"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="$router.go(-1)"
      autocomplete="off"
    >
    </van-search>
    <div id="container"></div>
    <div id="panel"></div>
  </div>
</template>

<script>

import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'Navigation',
  data() {
    return {
      keyword: '',
      map: undefined,
      location: {
        lng: undefined,
        lat: undefined
      }
    }
  },
  created() {
    window._AMapSecurityConfig = {
      securityJsCode: '5de61f73c434cbed2c68ae4001276c7f'
    }
    this.loadLocation()
  },
  methods: {
    onSearch() {

    },
    loadLocation() {
      AMapLoader.load({
        key: 'c46c1744e87ec48659b517ddb50a1419',
        version: '2.0',
        plugins: ['AMap.Geolocation']
      }).then((AMap) => {
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 1000,
          offset: [10, 20],
          zoomToAccuracy: true,
          position: 'RB'
        })

        geolocation.getCurrentPosition((status, result) => {
          if (status === 'complete') {
            console.log('getCurrentPosition success: ', result)
            this.location.lat = result.position.lat
            this.location.lng = result.position.lng
            // 加载地图
            this.loadMap([this.location.lng, this.location.lat])
            // 加载控件
            this.loadControl()
            // 加载标记
            this.loadMarker([this.location.lng, this.location.lat])
            this.loadSearch()
          } else {
            console.log('getCurrentPosition fail: ', result)
            // 加载地图
            this.loadMap()
            // 加载控件
            this.loadControl()
            // 加载标记
            this.loadMarker()
            this.loadSearch()
          }
        })
      })
    },
    loadMap(position) {
      AMapLoader.load({
        key: 'c46c1744e87ec48659b517ddb50a1419',
        version: '2.0',
        plugins: []
      }).then((AMap) => {
        const config = {
          zoom: 10
        }
        if (position !== undefined) {
          config.center = position
        }
        this.map = new AMap.Map('container', config)
      })
    },
    loadMarker(position) {
      AMapLoader.load({
        key: 'c46c1744e87ec48659b517ddb50a1419',
        version: '2.0',
        plugins: ['AMap.Geolocation']
      }).then((AMap) => {
        const marker = new AMap.Marker({
          position: position,
          title: '我'
        })
        this.map.add(marker)
      })
    },
    loadControl() {
      AMapLoader.load({
        key: 'c46c1744e87ec48659b517ddb50a1419',
        version: '2.0',
        plugins: [
          'AMap.ToolBar',
          'AMap.Scale',
          'AMap.HawkEye',
          'AMap.MapType',
          'AMap.Geolocation'
        ]
      }).then((AMap) => {
        // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        this.map.addControl(new AMap.HawkEye({ isOpen: true }))

        // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
        this.map.addControl(new AMap.MapType())

        // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
        this.map.addControl(new AMap.Geolocation())
      })
    },
    loadSearch() {
      // 输入提示
      const autoOptions = {
        input: 'tip-input'
      }
      AMapLoader.load({
        key: 'c46c1744e87ec48659b517ddb50a1419',
        version: '2.0',
        plugins: ['AMap.PlaceSearch', 'AMap.AutoComplete']
      }).then((AMap) => {
        const auto = new AMap.AutoComplete(autoOptions)

        auto.search(this.keyword, (status, result) => {
          // 搜索成功时，result即是对应的匹配数据
          console.log(result)
        })
        const placeSearch = new AMap.PlaceSearch({
          map: this.map
        }) // 构造地点查询类
        auto.on('select', select)// 注册监听，当选中某条记录时会触发
        function select(e) {
          placeSearch.setCity(e.poi.adcode)
          placeSearch.search(e.poi.name) // 关键字查询查询
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
#container
  width: 100%
  position: fixed
  left: 0
  right: 0
  top: 54px
  bottom: 0
</style>
