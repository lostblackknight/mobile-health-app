<template>
  <div class="container">
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="image in images" :key="image">
          <div class="header">
            <van-image
              width="100%"
              height="100%"
              :src="image"
            />
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="card">
      <div class="hospital-name">
        <span>{{ hospital.hospitalName }}</span>
      </div>
      <div class="middle">
        <van-row>
          <van-col span="4">
            <div class="logo">
              <van-image
                width="100%"
                height="100%"
                :src="hospital.logo"
              />
            </div>
          </van-col>
          <van-col span="14">
            <div class="level-name"><span>{{ hospital.levelName }}</span></div>
            <div class="class-name"><span>{{ hospital.className }}</span></div>
          </van-col>
          <van-col span="6">
            <div class="gua-hao">
              <van-button size="small" type="info" @click="handleClick">去挂号</van-button>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="info">
        <section>
          <div class="title">
            <h3>
              <van-icon name="phone"/>
              联系电话：{{ hospital.telephone }}
            </h3>
          </div>
        </section>
        <section>
          <div class="title">
            <h3>
              <van-icon name="location"/>
              地址及交通
            </h3>
          </div>
          <div class="content">
            <div class="title-1">
              地址：<span>{{ hospital.address }}</span>
            </div>
            <div class="title-1">
              交通：<span>{{ hospital.route }}</span>
            </div>
          </div>
        </section>
        <section>
          <div class="title">
            <h3>
              <van-icon name="coupon"/>
              医院简介
            </h3>
          </div>
          <div class="content">{{ hospital.intro }}</div>
        </section>
        <section>
          <div class="title">
            <h3>
              <van-icon name="star"/>
              预约规则
            </h3>
          </div>
          <div class="content">{{ hospital.rules === null ? '暂无规则' : hospital.rules }}</div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { getHospital } from '@/api/search'

export default {
  name: 'Hospital',
  data() {
    return {
      hospital: {},
      images: []
    }
  },
  created() {
    getHospital({ hospitalCode: this.$route.params.id })
      .then(({ data }) => {
        this.hospital = data[0]
        this.images = data[0].images.split(',')
      })
  },
  methods: {
    handleClick() {
      this.$router.push(`/dept/${this.hospital.hospitalCode}`)
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  height: 100vh
  background-color: #f7f8fa

  .header
    height: 190px

  .card
    position: relative
    width: 100vw
    border-radius: 20px
    background-color: white
    padding-bottom: 20px

    .hospital-name
      padding-top: 20px
      padding-left: 14px
      font-weight: bold
      font-size: 20px
      color: #333

    .middle
      padding-left: 14px
      padding-top: 10px

      .logo
        width: 50px
        height: 50px

      .level-name
        margin-top: 6px
        font-size: 12px
        font-weight: bold
        color: #333

      .class-name
        font-size: 12px
        font-weight: bold
        color: #333

      .gua-hao
        margin-top: 4px

    .info
      font-size: 14px

      section
        margin-left: 10px

        .content
          padding-left: 20px
          padding-right: 20px

        .title-1
          margin-bottom: 10px

</style>
