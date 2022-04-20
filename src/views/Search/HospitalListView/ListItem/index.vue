<template>
  <div class="container" @click="handleClick">
    <van-row>
      <van-col span="6">
        <div class="avatar">
          <van-image round width="100%" height="100%" :src="hospital.logo"/>
        </div>
      </van-col>
      <van-col span="18">
        <div class="line"><span>{{ hospital.hospitalName }}</span></div>
        <div class="info">
          <van-row>
            <van-col span="20">
              <div class="level-name">
                <span style="color: #777">等级 </span>
                <span class="name-label">{{ hospital.levelName }}</span>
              </div>
              <div class="class-name">
                <span style="color: #777">类型 </span>
                <span class="name-label">{{ hospital.className }}</span>
              </div>
            </van-col>
            <van-col span="4">
              <div class="city">
                <span>{{ hospital.city }}</span>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    hospital: Object
  },
  methods: {
    handleClick() {
      this.$emit('click', this.hospital.hospitalCode)
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  background-color: white
  border-bottom: 1px solid rgba(0, 0, 0, 0.04)

  .avatar
    margin: 10px
    height: 70px
    width: 70px

  .line
    font-size: 18px
    font-weight: bold
    color: #333
    margin-top: 10px

  .info
    margin-top: 4px

    .level-name, .class-name
      font-size: 12px
      margin-right: 5px
      color: #333

      .name-label
        background-color: rgba(119, 119, 119, 0.11)
        margin-left: 5px
        padding: 2px
        border-radius: 4px

    .class-name
      margin-top: 2px

    .city
      margin-top: 14px
      font-size: 14px
      color: #777

  ::v-deep .van-image__img
    border-radius: 20px
</style>
