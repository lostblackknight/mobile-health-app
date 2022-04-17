<template>
  <div class="container">
    <div class="header">
      <van-row>
        <van-col span="22">
          <van-row>
            <van-col>
              <div @click="() => {this.$router.push(`/dept/${dept.hospitalCode}`)}" class="dept-name">{{ dept.deptName }}</div>
            </van-col>
          </van-row>
          <van-row>
            <van-col>
              <div @click="() => {this.$router.push(`/hospital/${dept.hospitalCode}`)}" class="hospital-name">{{ dept.hospitalName }}</div>
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
    <div v-if="scheduleDateList.length > 0" class="schedule">
      <div class="schedule-tag">
        <div class="schedule-tag-item" :data-date="item.date" @click="searchDoctor(item.date)" v-for="item in scheduleDateList" :key="item.date">
          <div class="title1">{{ item.week }}</div>
          <div class="title2">{{ item.day }}</div>
          <div><span class="title3" :style="{color: item.status === 1 ? 'green' : 'red'}">{{ item.status === 1 ? '有号' : '无号' }}</span></div>
        </div>
      </div>
    </div>
    <div v-if="doctorList.length > 0" class="doctor-list">
      <div class="doctor-item" @click="goDoctorPage(doctor)" v-for="doctor in doctorList" :key="doctor.doctorCode">
        <van-row>
          <van-col span="5">
            <div class="avatar">
              <van-image width="100%" height="100%" :src="doctor.icon"/>
            </div>
          </van-col>
          <van-col span="19">
            <div class="name">
              <van-row>
                <van-col span="21">
                  <span>{{ doctor.doctorName }}</span>
                </van-col>
                <van-col>
                  <span class="status" :style="{backgroundColor: doctor.status === 1 ? '#5acf83' : ''}">{{ doctor.status === 1 ? '有号' : '无号' }}</span>
                </van-col>
              </van-row>
            </div>
            <div class="level-name"><span>{{ doctor.levelName }}</span></div>
            <div class="expert"><span>擅长：{{ doctor.expert }}</span></div>
            <div>
              <span class="ill" v-for="ill in doctor.illNameList" :key="ill">
                {{ ill }}
              </span>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div v-if="scheduleDateList.length === 0">
      <span class="tip">当前科室暂无放号</span>
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
      const today = new Date(2022, 3, 16)
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
        }).then(() => {
          this.searchDoctor('2022-04-16')
        })
    },
    searchDoctor(date) {
      const items = document.querySelectorAll('.container .schedule .schedule-tag-item')
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
    },
    goDoctorPage(doctor) {
      this.$router.push({
        path: `/doctor/${doctor.hospitalCode}/${doctor.deptCode}/${doctor.doctorCode}`
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  height: 100%
  background-color: white

  .tip
    margin-left: 10px
    font-size: 16px
    color: #777

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

  .doctor-list
    margin-top: 10px

    .doctor-item
      border-bottom: 1px solid rgba(0, 0, 0, 0.03)
      height: 120px

      .avatar
        margin-top: 25px
        margin-left: 10px
        width: 60px
        height: 60px

      .name
        margin-top: 10px
        font-size: 16px
        font-weight: bold

        .status
          color: white
          font-weight: normal
          padding: 2px
          border-radius: 4px
          font-size: 12px

      .level-name
        margin-top: 2px
        font-size: 14px
        color: #777

      .expert
        font-size: 12px
        color: #777
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis

      .ill
        font-size: 10px
        padding: 1px
        color: #0095EA
        background-color: white
        border-radius: 4px

  ::v-deep .van-image__img
    border-radius: 50px

</style>
