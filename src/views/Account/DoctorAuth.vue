<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="医生认证"
        fixed
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="main">
      <van-form @submit="onSubmit">
        <van-field name="file" label="医生证件照">
          <template #input>
            <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead"/>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { authToDoctor, uploadImage } from '@/api/member'

export default {
  name: 'DoctorAuth',
  data() {
    return {
      fileList: [],
      certificates: undefined
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    afterRead(file) {
      uploadImage(file.file)
        .then(({ data }) => {
          this.certificates = data.data.url
          this.$toast('证件上传成功')
        })
        .catch(() => {
          this.$toast('证件上传失败')
        })
    },
    onSubmit() {
      if (this.certificates === undefined || this.certificates === null) {
        this.$toast('证件上传中')
      } else {
        authToDoctor({ certificates: this.certificates })
          .then(() => {
            this.$toast('提交成功')
          })
          .catch(() => {
            this.$toast('提交失败')
          })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  .main
    margin-top: 46px
</style>
