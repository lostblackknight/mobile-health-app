<template>
  <div class="container">
    <div class="list-view">
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="hospital">
          <div class="title">医院</div>
          <div class="tip" v-if="hospitalList.length === 0"> 暂无数据</div>
          <hospital-list-item :hospital="hospital" v-for="hospital in hospitalList" :key="hospital.hospitalCode" @click="handleHospitalClick"/>
        </div>
        <div class="dept">
          <div class="title">科室</div>
          <div class="tip" v-if="deptList.length === 0"> 暂无数据</div>
          <dept-list-item :dept="dept" v-for="dept in deptList" :key="dept.deptCode" @click="handleDeptClick"/>
        </div>
        <div class="doctor">
          <div class="title">医生</div>
          <div class="tip" v-if="doctorList.length === 0"> 暂无数据</div>
          <doctor-list-item :doctor="doctor" v-for="doctor in doctorList" :key="doctor.doctorCode" @click="handleDoctorClick"/>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getDept, getDoctorListByDoctorName, getHospital } from '@/api/search'
import DeptListItem from '@/views/Search/DeptListView/ListItem'
import DoctorListItem from '@/views/Search/DoctorListView/ListItem'
import HospitalListItem from '@/views/Search/HospitalListView/ListItem'

export default {
  name: 'AllListView',
  props: ['keyword', 'city'],
  components: {
    DeptListItem,
    DoctorListItem,
    HospitalListItem
  },
  data() {
    return {
      loading: false,
      error: false,
      finished: false,
      deptList: [],
      doctorList: [],
      hospitalList: []
    }
  },
  methods: {
    async onLoad() {
      this.loading = true
      try {
        const deptList = await getDept({
          deptName: this.keyword,
          city: this.city,
          pageSize: 3
        })

        this.deptList = deptList.data

        const doctorList = await getDoctorListByDoctorName({
          doctorName: this.keyword,
          city: this.city,
          pageSize: 3
        })

        this.doctorList = doctorList.data

        const hospitalList = await getHospital({
          hospitalName: this.keyword,
          city: this.city,
          pageSize: 3
        })

        this.hospitalList = hospitalList.data

        this.loading = false
        this.finished = true
      } catch (e) {
        this.loading = false
        this.error = true
      } finally {
        this.loading = false
      }
    },
    handleDoctorClick({
      hospitalCode,
      deptCode,
      doctorCode
    }) {
      this.$router.push(`/doctor/${hospitalCode}/${deptCode}/${doctorCode}`)
    },
    handleDeptClick(hospitalCode, deptCode) {
      this.$router.push(`/schedule/${hospitalCode}/${deptCode}/`)
    },
    handleHospitalClick(hospitalCode) {
      this.$router.push(`/hospital/${hospitalCode}`)
    }
  }
}
</script>

<style lang="sass" scoped>
.container

  .tip
    color: #777777
    font-size: 14px
    margin-top: 10px
    padding-bottom: 10px
  .hospital
    background-color: white
    border-radius: 10px
    padding: 10px 10px 0 10px
    margin: 10px

  .dept
    background-color: white
    border-radius: 10px
    padding: 10px 10px 0 10px
    margin: 10px

  .doctor
    background-color: white
    border-radius: 10px
    padding: 10px 10px 0 10px
    margin: 10px
</style>
