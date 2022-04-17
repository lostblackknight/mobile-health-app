<template>
  <div class="container">
    <div class="list-view">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        :finished="finished"
        @load="onLoad"
      >
        <list-item :dept="dept" v-for="dept in deptList" :key="dept.deptCode" @click="handleClick"/>
      </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getDept } from '@/api/search'
import ListItem from './ListItem'

export default {
  name: 'DeptListView',
  props: ['deptName', 'city'],
  components: {
    ListItem
  },
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      error: false,
      deptList: [],
      pageNum: 1,
      pageSize: 5
    }
  },
  methods: {
    onLoad() {
      this.loading = true
      getDept({
        deptName: this.deptName,
        city: this.city,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(({ data }) => {
          data.forEach(item => {
            this.deptList.unshift(item)
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
    handleClick(hospitalCode, deptCode) {
      this.$router.push(`/schedule/${hospitalCode}/${deptCode}/`)
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      getDept({
        deptName: this.deptName,
        city: this.city,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(({ data }) => {
          data.forEach(item => {
            this.deptList.unshift(item)
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
</style>
