<template>
  <div>
    <van-nav-bar
      title="选择地区"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-row>
      <van-col>
        <van-sidebar v-model="activeKey">
          <van-sidebar-item :key="province" v-for="province in areaList.province_list" :title="province"/>
        </van-sidebar>
      </van-col>
      <van-col>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
        <div>aaaa</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'

export default {
  name: 'City',
  data() {
    return {
      activeKey: 0,
      areaList: areaList
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
