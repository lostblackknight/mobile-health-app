<template>
  <div class="container">
    <div class="header">
      <van-row>
        <van-col span="22">
          <van-row>
            <van-col>
              <div class="dept-name">{{ dept.deptName }}</div>
            </van-col>
          </van-row>
          <van-row>
            <van-col>
              <div class="hospital-name">{{ dept.hospitalName }}</div>
            </van-col>
          </van-row>
        </van-col>
        <van-row>
          <div class="go-home">
            <van-icon name="wap-home-o" @click="() => this.$router.push('/home')"/>
          </div>
        </van-row>
      </van-row>
    </div>
    <div class="schedule">
      <div class="schedule-tag">
        <div class="schedule-tag-item" :data-date="item.date" @click="searchDoctor(item.date)" v-for="item in scheduleDateList" :key="item.date">
          <div class="title1">{{ item.week }}</div>
          <div class="title2">{{ item.day }}</div>
          <div><span class="title3" :style="{color: item.status === 1 ? 'green' : 'red'}">{{ item.status === 1 ? '有号' : '无号' }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDept, getDoctorList, getScheduleDateList } from '@/api/search'

export default {
  name: 'Schedule',
  data() {
    return {
      hospitalCode: undefined,
      deptCode: undefined,
      dept: {},
      scheduleDateList: [],
      doctorList: []
    }
  },
  created() {
    this.hospitalCode = this.$route.params.hospitalCode
    this.deptCode = this.$route.params.deptCode
    this.getDept()
  },
  methods: {
    formatDateGetDay(date) {
      const d = new Date(date)
      return d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    },
    isToday(date) {
      const d = new Date(date)
      const today = new Date(2022, 3, 3)
      return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate()
    },
    getDept() {
      getDept({
        hospitalCode: this.hospitalCode,
        deptCode: this.deptCode
      })
        .then(({ data }) => {
          this.dept = data[0]
          this.getScheduleDateList()
        })
    },
    getScheduleDateList() {
      getScheduleDateList(this.hospitalCode, this.deptCode)
        .then(({ data }) => {
          this.scheduleDateList = data
          this.scheduleDateList.map(value => {
            if (this.isToday(value.date)) {
              value.week = '今天'
            }
            value.day = this.formatDateGetDay(value.date)
            return value
          })
        })
    },
    searchDoctor(date) {
      const items = document.querySelectorAll('.schedule-tag-item')
      items.forEach(item => {
        item.classList.remove('schedule-date-item-active')
        const d = item.getAttribute('data-date')
        if (d === date) {
          item.classList.add('schedule-date-item-active')
        }
      })

      getDoctorList(this.hospitalCode, this.deptCode, date)
        .then(({ data }) => {
          this.doctorList = data
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  height: 100%
  background-color: white

  .schedule-date-item-active
    background-color: #42b983 !important
    color: white !important

  .header
    padding: 10px

    .dept-name
      font-weight: bold
      color: #333333

    .hospital-name
      font-size: 12px
      color: #666
      padding-left: 2px

    .go-home
      font-size: 24px

  .info
    padding-left: 10px
    font-size: 14px
    color: #666

  .schedule
    .schedule-tag
      white-space: nowrap
      padding: 8px 0
      overflow-y: auto

      &::-webkit-scrollbar
        display: none

    .schedule-tag-item
      width: 52px
      height: 64px
      border-radius: 4px
      margin-left: 10px
      padding: 2px
      font-size: 14px
      text-align: center
      background-color: #f8f8f8
      display: inline-block

      .title1
        margin-top: 6px
        font-size: 10px

      .title2
        font-weight: bold
        margin-top: 2px
        color: rgba(0, 0, 0, 0.78)
        font-size: 14px
        margin-bottom: 2px

      .title3
        font-size: 10px
        padding: 2px
        background-color: white

      &:last-child
        margin-right: 10px

</style>
