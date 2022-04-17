<template>
  <div class="container" @click="handleClick">
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
</template>

<script>
export default {
  name: 'ListItem',
  props: ['doctor'],
  methods: {
    handleClick() {
      this.$emit('click', this.doctor)
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  border-bottom: 1px solid rgba(0, 0, 0, 0.03)
  padding-bottom: 10px
  background-color: white

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
