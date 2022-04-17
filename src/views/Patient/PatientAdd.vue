<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="添加就诊人"
        left-arrow
        @click-left="() => this.$router.go(-1)"
      />
    </div>
    <div class="add-form">
      <van-form @submit="onSubmit" label-width="30%">
        <van-field
          v-model="patient.name"
          name="name"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field name="sex" label="性别">
          <template #input>
            <van-radio-group v-model="patient.sex" direction="horizontal">
              <van-radio name="男">男</van-radio>
              <van-radio name="女">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          readonly
          clickable
          name="birthDate"
          :value="patient.birthDate"
          label="出生日期"
          placeholder="点击选择出生日期"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请选择出生日期' }]"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-datetime-picker
            type="date"
            @confirm="onConfirm"
            @cancel="onCancel"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </van-popup>
        <van-field
          v-model="patient.certificatesNo"
          name="certificatesNo"
          label="身份证号"
          placeholder="请输入身份证号"
          :maxlength="18"
          :rules="[{ required: true, message: '请填写身份证号' }]"
        />
        <van-field
          v-model="patient.phone"
          type="phone"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          :maxlength="11"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="patient.contactsName"
          type="contactsName"
          name="contactsName"
          label="联系人姓名"
          placeholder="请输入联系人姓名"
        />
        <van-field
          v-model="patient.contactsCertificatesNo"
          name="contactsCertificatesNo"
          label="联系人身份证号"
          placeholder="请输入联系人身份证号"
        />
        <van-field
          v-model="patient.contactsPhone"
          name="contactsPhone"
          label="联系人手机号"
          placeholder="请输入联系人手机号"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { createPatient } from '@/api/patient'

export default {
  name: 'PatientAdd',
  data() {
    return {
      showPicker: false,
      patient: {
        name: undefined,
        certificatesNo: undefined,
        sex: '男',
        birthDate: '',
        phone: undefined,
        contactsName: undefined,
        contactsCertificatesNo: undefined,
        contactsPhone: undefined
      },
      minDate: new Date(1950, 1, 1),
      maxDate: new Date(2050, 1, 1)
    }
  },
  created() {
    this.patient.birthDate = moment().format('yyyy-MM-DD')
  },
  methods: {
    onSubmit() {
      createPatient(this.patient)
        .then(({ message }) => {
          this.$toast(message)
        })
        .catch(({ message }) => {
          this.$toast(message)
        })
    },
    onConfirm(date) {
      this.patient.birthDate = moment(date).format('yyyy-MM-DD')
      this.showPicker = false
    },
    onCancel() {
      this.showPicker = false
      this.patient.birthDate = ''
    }
  }
}
</script>

<style scoped>

</style>
