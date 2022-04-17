<template>
  <div class="container">
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
          <list-item :doctor="doctor" v-for="doctor in doctorList" :key="doctor.doctorCode" @click="handleClick"/>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem'
import { getDoctorListByDoctorName } from '@/api/search'

export default {
  name: 'DoctorListView',
  props: ['doctorName', 'city'],
  components: {
    ListItem
  },
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      error: false,
      doctorList: [],
      pageNum: 1,
      pageSize: 5
    }
  },
  methods: {
    onLoad() {
      this.loading = true
      getDoctorListByDoctorName({
        doctorName: this.doctorName,
        city: this.city,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(({ data }) => {
          data.forEach(item => {
            this.doctorList.unshift(item)
          })
          this.loading = false
          this.finished = true
          this.pageNum++
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    },
    handleClick({
      hospitalCode,
      deptCode,
      doctorCode
    }) {
      this.$router.push(`/doctor/${hospitalCode}/${deptCode}/${doctorCode}`)
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      getDoctorListByDoctorName({
        doctorName: this.doctorName,
        city: this.city,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(({ data }) => {
          data.forEach(item => {
            this.doctorList.unshift(item)
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
    height: 100vh
</style>
