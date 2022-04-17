<template>
  <div class="container">
    <div class="dropdown-menu">
      <van-dropdown-menu>
        <van-dropdown-item v-model="levelName" :options="option1" @change="onLoad"/>
        <van-dropdown-item v-model="className" :options="option2" @change="onLoad"/>
      </van-dropdown-menu>
    </div>
    <div class="list-view">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <list-item :hospital="hospital" v-for="hospital in hospitalList" :key="hospital.hospitalCode" @click="handleClick"/>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem'
import { getHospital } from '@/api/search'

export default {
  name: 'HospitalListView',
  components: { ListItem },
  props: ['city', 'hospitalName'],
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      error: false,
      levelName: undefined,
      className: undefined,
      option2: [
        {
          text: '医院类型',
          value: undefined
        },
        {
          text: '综合医院',
          value: '综合医院'
        },
        {
          text: '儿童医院',
          value: '儿童医院'
        },
        {
          text: '中医医院',
          value: '中医医院'
        },
        {
          text: '骨科医院',
          value: '骨科医院'
        },
        {
          text: '中西专科院',
          value: '中西专科院'
        },
        {
          text: '中西医结合院',
          value: '中西医结合院'
        },
        {
          text: '其他',
          value: '其他'
        }
      ],
      option1: [
        {
          text: '医院等级',
          value: undefined
        },
        {
          text: '特等医院',
          value: '特等医院'
        },
        {
          text: '三甲医院',
          value: '三甲医院'
        },
        {
          text: '三级医院',
          value: '三级医院'
        },
        {
          text: '二级医院',
          value: '二级医院'
        },
        {
          text: '一级医院',
          value: '一级医院'
        },
        {
          text: '其他',
          value: '其他'
        }
      ],
      hospitalList: [],
      pageNum: 1,
      pageSize: 5
    }
  },
  methods: {
    handleClick(hospitalCode) {
      this.$router.push(`/hospital/${hospitalCode}`)
    },
    onLoad() {
      this.loading = true
      getHospital({
        hospitalName: this.hospitalName,
        city: this.city,
        levelName: this.levelName,
        className: this.className,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(({ data }) => {
          data.forEach(item => {
            this.hospitalList.unshift(item)
          })
          this.loading = false
          this.finished = true
          this.refreshing = false
          this.pageNum++
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      getHospital({
        hospitalName: this.hospitalName,
        city: this.city,
        levelName: this.levelName,
        className: this.className,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(({ data }) => {
          data.forEach(item => {
            this.hospitalList.unshift(item)
          })
          this.loading = false
          this.finished = true
          this.refreshing = false
          this.pageNum++
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  .list-view
    margin: 10px
    height: 500px

  ::v-deep .van-pull-refresh__track
    height: 100vh
</style>
