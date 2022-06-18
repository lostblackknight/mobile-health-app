<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="预约信息"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="doctor-info">
      <van-cell-group inset>
        <van-cell>
          <template #title>
            <van-row>
              <van-col span="4">
                <div class="avatar">
                  <van-image width="100%" height="100%" :src="scheduleInfo.icon"/>
                </div>
              </van-col>
              <van-col span="16">
                <van-row>
                  <van-col span="5">
                    <div class="doctor-name">
                      {{ scheduleInfo.doctorName }}
                    </div>
                  </van-col>
                  <van-col>
                    <div class="level-name">
                      {{ scheduleInfo.levelName }}
                    </div>
                  </van-col>
                </van-row>
                <van-row>
                  <van-col>
                    <div class="hospital-dept">
                      {{ scheduleInfo.hospitalName }} | {{ scheduleInfo.deptName }}
                    </div>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="schedule-info">
      <van-cell-group inset>
        <van-cell title="就诊日期" :value="scheduleInfo.date"></van-cell>
        <van-cell title="就诊时间" :value="(scheduleInfo.week + ' ' + (scheduleInfo.timeType === 'am' ? '上午': '下午'))"></van-cell>
        <van-cell title="挂号费" :value="scheduleInfo.amount"></van-cell>
        <van-cell title="就诊人" :value="patient.name" is-link @click="addPatient"/>
      </van-cell-group>
    </div>

    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit" @click="onConfirm">{{submitText}}</van-button>
    </div>

    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { getSchedule } from '@/api/search'
import { getPatientsByMemberId } from '@/api/patient'
import { createOrder } from '@/api/order'

export default {
  name: 'BookingInfoConfirm',
  data() {
    return {
      show: false,
      actions: [],
      scheduleId: undefined,
      scheduleInfo: {
        amount: 0,
        date: undefined,
        deptCode: undefined,
        deptName: undefined,
        doctorCode: undefined,
        doctorName: undefined,
        expert: undefined,
        hospitalCode: undefined,
        hospitalName: undefined,
        icon: undefined,
        illNameList: undefined,
        levelName: undefined,
        memberId: 0,
        scheduleId: undefined,
        timeType: undefined,
        week: undefined,
        yuYueMax: 0,
        yuYueNum: 0,
        yuYueState: 0
      },
      patient: {
        id: undefined,
        name: undefined,
        certificatesNo: undefined,
        sex: undefined,
        birthDate: undefined,
        phone: undefined,
        contactsName: undefined,
        contactsCertificatesNo: undefined,
        contactsPhone: undefined
      },
      patientList: [],
      submitText: '确认预约'
    }
  },
  created() {
    this.scheduleId = this.$route.params.id
    this.getScheduleInfo()
  },
  methods: {
    onConfirm() {
      if (this.patient.id === undefined) {
        this.$toast('请选择就诊人')
      } else {
        // 生成订单
        if (this.submitText === '正在提交') {
          this.$toast('请勿重复提交')
          return
        }
        this.submitText = '正在提交'
        createOrder(this.scheduleId, this.patient.id)
          .then(({ data, message }) => {
            this.$toast(message)
            this.$router.push(`/order/detail/${data.orderSn}`)
          }).catch(({ message }) => {
            this.$toast(message)
          }).finally(() => {
            this.submitText = '确认预约'
          })
      }
    },
    getScheduleInfo() {
      getSchedule({ scheduleId: this.scheduleId })
        .then(({ data }) => {
          this.scheduleInfo = data[0]
        })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    addPatient() {
      getPatientsByMemberId()
        .then(({ data }) => {
          this.patientList = data
          this.show = true
          this.actions = this.patientList
          this.actions.push({ name: '新增就诊人' })
        })
    },
    onCancel() {
      this.patient = {
        id: undefined,
        name: undefined,
        certificatesNo: undefined,
        sex: undefined,
        birthDate: undefined,
        phone: undefined,
        contactsName: undefined,
        contactsCertificatesNo: undefined,
        contactsPhone: undefined
      }
    },
    onSelect(action, index) {
      if (index !== this.patientList.length - 1) {
        this.patient = action
        // 添加就诊人
      } else {
        this.$router.push('/patient/add')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  background-color: #f7f8fa
  height: 100vh

  .doctor-info
    margin-top: 10px

    .avatar
      width: 50px
      height: 50px

    .doctor-name
      font-weight: bold
      font-size: 16px
      color: #333

    .level-name
      color: #777
      position: relative
      top: -0.5px

    .hospital-dept
      margin-top: 2px
      font-size: 12px
      color: #777

  .schedule-info
    margin-top: 10px

  ::v-deep .van-image__img
    border-radius: 50px
</style>
