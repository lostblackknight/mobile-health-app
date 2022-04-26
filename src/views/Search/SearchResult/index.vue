<template>
  <div class="container">
    <van-tabs v-model="active" color="#2d70fc" sticky title-active-color="#2d70fc">
      <van-tab title="综合">
        <all-list-view :keyword="keyword" :city="city" ref="all"/>
      </van-tab>
      <van-tab title="医院">
        <hospital-list-view ref="hospital" :hospital-name="keyword" :city="city"/>
      </van-tab>
      <van-tab title="科室">
        <dept-list-view ref="dept" :dept-name="keyword" :city="city"/>
      </van-tab>
      <van-tab title="医生">
        <doctor-list-view ref="doctor" :doctor-name="keyword" :city="city"/>
      </van-tab>
      <van-tab title="文章">
        <article-list-view :title="keyword" ref="article"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ArticleListView from '@/views/Search/ArticleListView'
import HospitalListView from '@/views/Search/HospitalListView'
import DeptListView from '@/views/Search/DeptListView'
import DoctorListView from '@/views/Search/DoctorListView'
import AllListView from '@/views/Search/AllListView'

export default {
  name: 'SearchResult',
  components: {
    AllListView,
    DoctorListView,
    DeptListView,
    HospitalListView,
    ArticleListView
  },
  props: ['keyword', 'city'],
  watch: {
    active(active) {
      this.$nextTick(() => {
        this.$store.dispatch('search/setActive', active)
      })
    }
  },
  data() {
    return {
      active: this.$store.getters.active
    }
  },
  methods: {
  }
}
</script>

<style lang="sass" scoped>
.container
  height: 100%
</style>
