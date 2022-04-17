<template>
  <div class="container" @click="handleClick">
    <van-row>
      <van-col span="5">
        <div class="logo">
          <van-image width="100%" height="100%" src="https://wximg.91160.com/wechat/img/search/default_dep.png"/>
        </div>
      </van-col>
      <van-col span="16">
        <div class="dept-name">{{ dept.deptName }}</div>
        <div class="hospital-name"> {{ dept.hospitalName }}</div>
      </van-col>
      <van-col>
        <div class="city">{{ dept.city }}</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>

export default {
  name: 'ListItem',
  props: ['dept'],
  methods: {
    handleClick() {
      this.$emit('click', this.dept.hospitalCode, this.dept.deptCode)
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  background-color: white
  border-bottom: 1px solid rgba(0, 0, 0, 0.04)

  .logo
    width: 50px
    height: 50px
    margin: 10px

  .dept-name
    font-size: 18px
    font-weight: bold
    color: #333
    margin-top: 12px
  .hospital-name
    font-size: 14px
    color: #777
  .city
    font-size: 14px
    color: #777
    margin-top: 34px
</style>
