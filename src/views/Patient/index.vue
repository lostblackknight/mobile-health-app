<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="就诊人"
        right-text="添加"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        fixed
      />
    </div>
    <div class="patient-list">
      <div class="patient-item" v-for="patient in patientList" :key="patient.id">
        <div class="top">
          <van-row>
            <van-col span="4">
              <div class="avatar">
                <van-image height="100%" width="100%" :src="userLogo"/>
              </div>
            </van-col>
            <van-col span="16">
              <van-row>
                <van-col>
                  <div class="patient-name">
                    {{ patient.name }}
                  </div>
                </van-col>
              </van-row>
              <van-row>
                <van-col>
                  <div class="patient-number">
                    {{ patient.certificatesNo }}
                  </div>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <van-row>
            <van-col>
              <div class="patient-phone">
                联系方式：<span class="phone-number">{{ patient.phone }}</span>
              </div>
            </van-col>
          </van-row>
        </div>
        <div class="bottom">
          <div class="opt">
            <van-row type="flex" justify="end">
              <van-col span="4">
                <van-button plain type="info" :to="`/patient/edit/${patient.id}`">编辑</van-button>
              </van-col>
              <van-col span="4">
                <van-button plain type="danger" @click="handleDelete(patient)">删除</van-button>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userLogo from '@/assets/user_logo.png'
import { deletePatientById, getPatientsByMemberId } from '@/api/patient'

export default {
  name: 'Patient',
  data() {
    return {
      userLogo: userLogo,
      patientList: []
    }
  },
  created() {
    this.getPatients()
  },
  methods: {
    getPatients() {
      getPatientsByMemberId()
        .then(({ data }) => {
          this.patientList = data
        })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.$router.push(`/patient/add`)
    },
    handleDelete(patient) {
      this.$dialog.confirm({
        title: '删除就诊人',
        message: `确定要删除就诊人 ${patient.name} 吗？`
      })
        .then(() => {
          deletePatientById(patient.id)
            .then(({ message }) => {
              this.$toast(message)
            }).catch(({ message }) => {
              this.$toast(message)
            })
            .finally(() => {
              this.getPatients()
            })
        })
        .catch(() => {
          this.$toast('取消成功')
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  background-color: #f7f8fa
  height: 100%

  .patient-list
    margin-top: 46px
    .patient-item
      padding-top: 8px
      margin-bottom: 4px
      background-color: white
      font-size: 14px

      .top
        border-bottom: 1px solid rgba(0, 0, 0, 0.04)
        padding-left: 14px

        .avatar
          width: 50px
          height: 50px

        .patient-name
          margin-top: 4px
          margin-left: 2px
          font-size: 16px

        .patient-number
          margin-top: 2px
          font-size: 16px
          color: #777777

        .patient-phone
          margin-top: 10px
          color: #777777
          margin-bottom: 10px

          .phone-number
            color: #333
            font-size: 16px

      .bottom
        .opt
          padding-top: 10px
          padding-bottom: 10px

  ::v-deep .van-button
    height: 32px
    padding: 0 10px
</style>
