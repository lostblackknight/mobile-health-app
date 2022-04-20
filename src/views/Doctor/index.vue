<template>
  <div class="container">
    <div class="header">
      <van-row>
        <van-col span="19">
          <van-row>
            <van-col span="7">
              <div class="doctor-name"><span>{{ scheduleDetail.doctorName }}</span></div>
            </van-col>
            <van-col span="10">
              <div class="level-name"><span>{{ scheduleDetail.levelName }}</span></div>
            </van-col>
          </van-row>
          <van-row>
            <van-col>
              <div class="line"><span>{{ scheduleDetail.hospitalName }}</span></div>
            </van-col>
          </van-row>
        </van-col>
        <van-col span="5">
          <div class="icon">
            <van-image :src="scheduleDetail.icon" width="100%" height="100%"/>
          </div>
        </van-col>
      </van-row>
      <div class="expert">
        <b>专长：</b>{{ scheduleDetail.expert }}
      </div>
      <div class="ill">
        <span class="label" v-for="ill in scheduleDetail.illNameList" :key="ill">
          {{ ill }}
        </span>
      </div>
    </div>
    <div class="main">
      <div class="dept-tag">
        <div class="dept-tag-item" :data-deptCode="dept.deptCode" @click="handleDeptClick(dept)" v-for="dept in deptList" :key="dept.deptCode">{{ dept.deptName }}</div>
      </div>
      <div class="schedule-box" v-if="scheduleDetail">
        <schedule-box :data="scheduleDetail.schedules" @click="handleClick"></schedule-box>
      </div>
    </div>
    <div class="zi-xun">
      <div v-if="scheduleDetail.memberId === 0">{{scheduleDetail.doctorName}}医生暂未开通咨询服务</div>
    </div>
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '50%' }"
      v-if="payInfo !== undefined"
      @close="handleClose"
    >
      <van-row>
        <van-col>
          <div class="pay-date">
            <span>{{ payInfo.date }}</span>
          </div>
        </van-col>
        <van-col>
          <div class="pay-week">
            <span>{{ payInfo.week }}</span>
          </div>
        </van-col>
        <van-col>
          <div class="pay-time">
            <span>{{ payInfo.detail.timeType === 'am' ? '上午' : '下午' }}</span>
          </div>
        </van-col>
      </van-row>
      <van-row>
        <van-col>
          <div class="pay-title"><span>{{ scheduleDetail.hospitalName + '(' + scheduleDetail.deptName + ')' }}</span></div>
        </van-col>
      </van-row>
      <div class="pay-amount" v-if="payInfo.detail !== undefined">
        <span>挂号费：</span> <span class="pay-symbol">￥<span class="pay-money">{{ payInfo.detail.amount }}</span></span>
      </div>
      <div class="pay-yuYue-info" @click="handleYuYueClick(payInfo.detail.yuYueMax)">
        <div>{{ payInfo.detail.timeType === 'am' ? '00:00-11:59' : '12:00-23:59' }}</div>
        <div>剩余：{{ payInfo.detail.yuYueMax - payInfo.detail.yuYueNum }}</div>
      </div>
      <div>
        <van-button class="confirm-btn" @click="submit" color="#02c8b4" round>确认</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getDeptListByDoctorCode, getDoctorSchedule } from '@/api/search'
import ScheduleBox from '@/views/Doctor/ScheduleBox'

export default {
  name: 'Doctor',
  components: { ScheduleBox },
  data() {
    return {
      hospitalCode: undefined,
      deptCode: undefined,
      doctorCode: undefined,
      memberId: undefined,
      schedule: [],
      deptList: [],
      scheduleDetail: {
        memberId: undefined,
        schedules: [],
        doctorName: undefined,
        levelName: undefined,
        hospitalName: undefined,
        icon: undefined,
        expert: undefined,
        illNameList: undefined
      },
      show: false,
      payInfo: undefined,
      checked: false
    }
  },
  created() {
    this.hospitalCode = this.$route.params.hospitalCode
    this.deptCode = this.$route.params.deptCode
    this.doctorCode = this.$route.params.doctorCode
    this.memberId = this.$route.params.memberId

    getDoctorSchedule({
      hospitalCode: this.hospitalCode,
      deptCode: this.deptCode,
      doctorCode: this.doctorCode
    }).then(({ data }) => {
      this.scheduleDetail = data
    })

    getDeptListByDoctorCode({
      hospitalCode: this.hospitalCode,
      doctorCode: this.doctorCode
    })
      .then(({ data }) => {
        const curr = data[0]
        data.forEach((value, index) => {
          if (this.deptCode === value.deptCode) {
            data[0] = value
            data[index] = curr
          }
        })
        this.deptList = data
      }).then(() => {
        this.addDeptActiveStyle(this.deptCode)
      })
  },
  methods: {
    handleYuYueClick(count) {
      const selector = document.querySelector('.pay-yuYue-info')
      if (count > 0) {
        this.checked = true
        selector.classList.add('pay-active')
      } else {
        this.checked = false
      }
    },
    handleClose() {
      const selector = document.querySelector('.pay-yuYue-info')
      selector.classList.remove('pay-active')
      this.checked = false
    },
    submit() {
      if (!this.checked) {
        this.$toast('请选择预约时间范围')
      } else {
        // 跳转信息确认页
        this.$router.push(`/booking/info/confirm/${this.payInfo.detail.scheduleId}`)
      }
    },
    handleClick(data) {
      if (data.detail != null) {
        // 支付
        this.show = true
        this.payInfo = data
      }
    },
    handleDeptClick(d) {
      this.addDeptActiveStyle(d.deptCode)
      this.deptCode = d.deptCode
      getDoctorSchedule({
        hospitalCode: this.hospitalCode,
        deptCode: this.deptCode,
        doctorCode: this.doctorCode
      }).then(({ data }) => {
        this.scheduleDetail = data
      })
    },
    addDeptActiveStyle(deptCode) {
      const depts = document.querySelectorAll('.dept-tag-item')
      depts.forEach(dept => {
        const deptCodeEl = dept.getAttribute('data-deptCode')
        dept.classList.remove('dept-tag-item-active')
        if (deptCodeEl === deptCode) {
          dept.classList.add('dept-tag-item-active')
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.container

  .header
    padding-top: 22px
    padding-left: 10px
    padding-right: 10px
    background-color: #f7f8fa
    height: 220px

    .doctor-name
      font-size: 24px
      font-weight: bold
      color: #333

    .level-name
      margin-top: 10px
      margin-left: 4px
      font-size: 14px
      color: #777

    .line
      font-size: 14px
      margin-top: 4px
      color: #333

    .icon
      width: 60px
      height: 60px

    .expert
      margin-top: 10px
      font-size: 12px

    .ill
      margin-top: 14px

      .label
        font-size: 12px
        padding: 2px
        margin-right: 2px
        border-radius: 10px
        color: #2d70fc
        background-color: white

  .main
    .dept-tag
      white-space: nowrap
      padding: 8px 0
      overflow-y: auto
      background-color: white
      border-bottom: 1px solid rgba(0, 0, 0, 0.07)

      &::-webkit-scrollbar
        display: none

      .dept-tag-item
        border-radius: 20px
        margin-left: 10px
        padding: 2px 10px
        height: 30px
        line-height: 30px
        font-size: 14px
        font-weight: bold
        color: #333
        text-align: center
        background-color: rgba(180, 180, 180, 0.21)
        display: inline-block
        border: 1px solid rgba(0, 0, 0, 0.02)

      .dept-tag-item-active
        background-color: rgba(0, 198, 184, 0.06)
        border: 1px solid #00c6b8
        color: #00C6B8

        &:last-child
          margin-right: 10px

  .pay-date
    margin-top: 20px
    margin-left: 10px
    font-weight: bold
    line-height: 24px

  .pay-week
    margin-top: 18px
    margin-left: 10px
    font-weight: bold
    line-height: 26px

  .pay-time
    margin-top: 18px
    margin-left: 10px
    font-weight: bold
    line-height: 26px

  .pay-title
    margin-left: 12px
    font-size: 14px
    color: #777
    margin-top: 6px

  .pay-amount
    margin-left: 14px
    font-size: 14px
    color: #777
    margin-top: 50px

  .pay-symbol
    color: #FF6000

  .pay-money
    color: #FF6000
    font-size: 20px
    font-weight: bold

  .pay-yuYue-info
    margin-left: 12px
    margin-top: 20px
    font-size: 14px
    color: #777
    text-align: center
    width: 100px
    padding: 10px
    border-radius: 10px
    background-color: #f8f8f8
    border: 1px solid #f8f8f8

  .pay-active
    color: #00C6B8
    background-color: #f0fcfb
    border: 1px solid rgba(0, 198, 184, 0.6)

  .confirm-btn
    margin-left: 12px
    margin-right: 10px
    margin-top: 26px
    text-align: center
    width: 92%

  .zi-xun
    margin: 20px 20px 0 20px
    font-size: 14px
    color: #777
    background-color: #f8f8f8
    text-align: center
    padding: 20px
    border-radius: 10px

  ::v-deep .van-image__img
    border-radius: 50px
</style>
