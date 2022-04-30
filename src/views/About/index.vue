<template>
  <div class="container">
    <div class="top">
      <div class="header">
        <div class="settings">
          <span><van-icon size="0.6rem" name="setting-o" @click="handleSettingClick"/></span>
        </div>
      </div>
      <div class="user-container">
        <div class="user-card">
          <van-cell>
            <template #icon>
              <div class="avatar">
                <van-image round width="100%" height="100%" :src="avatar"/>
              </div>
            </template>
            <template #title>
              <div class="nick-name-wrapper">
                <span class="nick-name">{{ name }}</span>
              </div>
            </template>
            <template #label>
              <span class="authenticate">{{ showStatus(status) }}</span>
            </template>
          </van-cell>
        </div>
        <div class="user-info">
          <van-row>
            <van-col span="8">
              <div>
                <span>{{ userArticleReadList.length }}</span>
              </div>
              <div>
                浏览
              </div>
            </van-col>
            <van-col span="8">
              <div>
                <span>{{ userArticleLikeList.length }}</span>
              </div>
              <div>
                点赞
              </div>
            </van-col>
            <van-col span="8">
              <div>
                <span>{{ userArticleStarList.length }}</span>
              </div>
              <div>
                收藏
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <div class="record">
      <div class="title">诊疗记录</div>
      <van-grid :column-num="3" :border="false">
        <van-grid-item to="/order" icon="http://upload.sxyygh.com:8015/ImageServer//data/007/2021-03-11/960baba1-c08b-4961-b7a5-a0a9bcbc80d8.png" text="挂号历史"/>
        <van-grid-item to="/payment" icon="http://upload.sxyygh.com:8015/ImageServer//data/007/2021-03-11/6db37519-46fe-4110-b5b9-14f6007fa96d.png" text="缴费单"/>
        <van-grid-item to="/chat" icon="http://upload.sxyygh.com:8015/ImageServer//data/007/2021-03-11/0b09d2a0-c4db-46f4-a081-8445f0c7699c.png" text="在线问诊"/>
      </van-grid>
    </div>
    <div class="tools">
      <div class="title">常用工具</div>
      <van-grid :column-num="3" :border="false">
        <van-grid-item
          icon="http://upload.sxyygh.com:8015/ImageServer//data/007/2021-05-25/7f32a604-3563-4e58-8775-f4fd429aafa0.png"
          text="就诊人"
          to="/patient"
        />
        <van-grid-item
          v-if="$store.getters.roles.indexOf('doctor') !== -1"
          icon="http://upload.sxyygh.com:8015/ImageServer//data/007/2021-03-11/883fd341-3f99-4e3d-86ad-caeac2254783.png"
          text="我的问诊"
          to="/order/received"
        />
        <van-grid-item
          icon="http://upload.sxyygh.com:8015/ImageServer//data/007/2021-03-11/72050630-4abe-411b-91cb-f1b77c53747f.png"
          text="健康指导"
          to="/health"
        />
        <van-grid-item
          icon="http://upload.sxyygh.com:8015/ImageServer//data/007/2021-03-11/1a18e758-4d67-4fc8-920f-f81783ede290.png"
          text="医院导航"
          to="/navigation"
        />
      </van-grid>
    </div>
    <div style="height: 80px;"></div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { getUserArticleLikeList, getUserArticleReadList, getUserArticleStarList } from '@/api/topic'

export default {
  computed: {
    ...mapGetters([
      'avatar',
      'name',
      'status'
    ])
  },
  data() {
    return {
      userArticleLikeList: [],
      userArticleStarList: [],
      userArticleReadList: []
    }
  },
  created() {
    getUserArticleLikeList().then(({ data }) => {
      this.userArticleLikeList = data
    })
    getUserArticleReadList().then(({ data }) => {
      this.userArticleReadList = data
    })
    getUserArticleStarList().then(({ data }) => {
      this.userArticleStarList = data
    })
  },
  methods: {
    handleSettingClick() {
      this.$router.push('/account')
    },
    showStatus(status) {
      switch (status) {
        case 0:
          return '普通用户'
        case 1:
          return '医生'
        case -1:
          return '医生认证中'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  background-color: #f7f8fa
  height: 100vh

  .top
    background-color: #2d70fc

    .header
      background-color: #2d70fc
      position: relative
      height: 44px

      .settings
        position: absolute
        right: 14px
        top: 14px
        color: #fffdff

    .user-container
      background-color: #2d70fc
      height: 180px

      .user-card
        background-color: #2d70fc

        ::v-deep .van-cell
          background-color: #2d70fc

        .avatar
          width: 75px
          height: 75px
          margin-left: 10px

        .nick-name-wrapper
          margin-top: 4px

        .nick-name
          color: #fffdff
          font-size: 24px
          margin-left: 8px

        .authenticate
          color: #2d70fc
          background-color: #fffdff
          font-size: 11px
          font-weight: bold
          margin-left: 10px
          padding: 2px
          border: 1px solid rgba(0, 0, 0, 0.15)
          border-radius: 4px

      .user-info
        margin-top: 10px
        color: #fffdff
        font-size: 16px
        text-align: center

  .record
    margin: -20px 14px 0
    padding: 0 10px
    border-radius: 6px
    background-color: #ffffff

    .title
      font-size: 16px
      font-weight: 600
      color: rgba(0, 0, 0, 0.73)
      padding: 8px 2px

  .tools
    padding: 0 10px
    border-radius: 6px
    background-color: #ffffff
    margin: 10px 14px 0

    .title
      font-size: 16px
      font-weight: 600
      color: rgba(0, 0, 0, 0.73)
      padding: 8px 2px
</style>
