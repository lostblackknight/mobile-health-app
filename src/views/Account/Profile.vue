<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="个人资料"
        fixed
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="main">
      <van-cell-group>
        <van-cell title="用户名" :value="member.username" label="默认为手机号，不可修改"/>
        <van-cell title="昵称" :value="member.nickName" @click="modify('昵称', 'nickName')"/>
        <van-cell @click="handleUploadAvatar">
          <template #title>
            <van-row>
              <van-col span="20">
                <div class="avatar-label">
                  <span>头像</span>
                </div>
              </van-col>
              <van-col>
                <div class="avatar">
                  <van-image
                    round
                    fit="fill"
                    width="100%"
                    height="100%"
                    :src="member.avatar"
                  />
                </div>
              </van-col>
            </van-row>
          </template>
        </van-cell>
        <van-cell title="姓名" :value="member.realName" @click="modify('姓名', 'realName')"/>
        <van-cell title="手机号" :value="member.phone" @click="modify('手机号', 'phone')"/>
        <van-cell title="身份证号" :value="member.certificatesNumber" @click="modify('身份证号', 'certificatesNumber')"/>
      </van-cell-group>
    </div>

    <van-popup v-model="show" position="center" @close="onClose" :style="{ width: '80%', backgroundColor: '#f7f8fa' }">
      <div class="form">
        <van-form @submit="onSubmit">
          <van-field
            v-model="value"
            :placeholder="label"
            :rules="rules"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">确认</van-button>
          </div>
        </van-form>
      </div>
    </van-popup>

    <van-popup v-model="upShow" position="center" @close="onClose" :style="{ width: '60%', backgroundColor: '#f7f8fa' }">
      <div class="up-form" style="text-align: center">
        <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead"/>
        <div style="margin: 16px;">
          <van-button round block type="info" @click="onSubmit">确认</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getMemberById, modifyMember, uploadImage } from '@/api/member'

export default {
  name: 'Profile',
  data() {
    return {
      show: false,
      upShow: false,
      label: '',
      value: '',
      tag: '',
      fileList: [],
      member: {
        avatar: undefined,
        certificatesNumber: undefined,
        createTime: undefined,
        id: undefined,
        isDeleted: undefined,
        nickName: undefined,
        password: undefined,
        phone: undefined,
        realName: undefined,
        roles: undefined,
        status: undefined,
        updateTime: undefined,
        username: undefined
      },
      rules: []
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
    afterRead(file) {
      uploadImage(file.file)
        .then(({ data }) => {
          this.tag = 'avatar'
          this.value = data.data.url
          this.$toast(data.data.message)
        })
        .catch(({ data }) => {
          this.$toast(data.data.message)
        })
    },
    onClose() {
      this.label = ''
      this.tag = ''
      this.value = ''
      this.fileList = []
    },
    generateRules(label) {
      switch (label) {
        case '昵称':
          this.rules = [
            {
              required: true,
              message: '昵称不能为空'
            }
          ]
          break
        case '姓名':
          this.rules = [
            {
              required: true,
              message: '姓名不能为空'
            },
            {
              pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/,
              message: '请输入正确的姓名'
            }
          ]
          break
        case '手机号':
          this.rules = [
            {
              required: true,
              message: '手机号不能为空'
            },
            {
              pattern: /$[0-9]{11}/,
              message: '请输入正确的手机号'
            }
          ]
          break
        case '身份证号':
          this.rules = [
            {
              required: true,
              message: '身份证号不能为空'
            },
            {
              pattern: /$[0-9]{18}/,
              message: '请输入正确的身份证号'
            }
          ]
          break
      }
    },
    onSubmit() {
      if (this.value.length === 0) {
        return false
      }
      const member = {
        id: this.member.id
      }
      member[this.tag] = this.value
      if (this.tag === 'phone') {
        member.username = this.value
      }
      modifyMember(member)
        .then(({ message }) => {
          this.$toast(message)
        })
        .catch(({ message }) => {
          this.$toast(message)
        })
        .finally(() => {
          this.show = false
          this.upShow = false
          this.getProfile()
        })
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    getProfile() {
      getMemberById()
        .then(({ data }) => {
          this.member = data
        })
    },
    modify(label, tag) {
      this.show = true
      this.label = '请输入' + label
      this.tag = tag
      this.generateRules(label)
    },
    handleUploadAvatar() {
      this.upShow = true
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  .main
    margin-top: 46px

    .avatar-label
      line-height: 50px

    .avatar
      width: 50px
      height: 50px

  .form
    margin: 40px

  .up-form
    margin: 40px
</style>
