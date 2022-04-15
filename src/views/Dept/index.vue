<template>
  <div class="container">
    <div class="header">
      <van-row>
        <van-col span="2">
          <div class="logo">
            <van-image :src="hospital.logo" width="100%" height="100%"/>
          </div>
        </van-col>
        <van-col span="20">
          <div class="name">
            <span>{{ hospital.hospitalName }}</span>
          </div>
        </van-col>
        <van-col>
          <div class="go-home">
            <van-icon name="wap-home-o" @click="() => this.$router.push('/home')"/>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="main">
      <van-tree-select
        :items="items"
        :active-id.sync="activeId"
        :main-active-index.sync="activeIndex"
        @click-nav="handleClickNav"
        height="100%"
      >
        <template #content>
          <van-cell :key="item.id" v-for="(item) in leftItem" :title="item.text" is-link :to="`/schedule/${hospitalCode}/${item.id}`"/>
        </template>
      </van-tree-select>
    </div>
  </div>
</template>

<script>
import { getDeptList, getHospital } from '@/api/search'

export default {
  name: 'Dept',
  data() {
    return {
      hospitalCode: undefined,
      hospital: {},
      items: [],
      activeId: 1,
      activeIndex: 0,
      leftItem: []
    }
  },
  created() {
    this.hospitalCode = this.$route.params.id
    this.getDeptList()
    this.getHospital()
  },
  methods: {
    getHospital() {
      getHospital({ hospitalCode: this.hospitalCode })
        .then(({ data }) => {
          this.hospital = data[0]
        })
    },
    getDeptList() {
      getDeptList(this.hospitalCode)
        .then(({ data }) => {
          this.items = data
          this.leftItem = this.items[0].children
        })
    },
    handleClickNav(index) {
      this.leftItem = this.items[index].children
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  height: 100%
  background-color: #f7f8fa

  ::v-deep .van-sidebar-item--select::before
    background-color: #2d70fc

  .header
    padding: 10px
    height: 30px

    .logo
      width: 30px
      height: 30px

    .name
      margin-left: 10px
      margin-top: 5.4px
      font-size: 18px
      line-height: 18px
      font-weight: bold
      color: #333

    .go-home
      font-size: 24px

  .main
    position: fixed
    top: 50px
    left: 0
    right: 0
    bottom: 0
</style>
