<template>
  <div class="container" @click="handleClick">
    <van-row>
      <van-col span="4">
        <div class="avatar">
          <van-image round width="100%" height="100%" :src="article.avatar"/>
        </div>
      </van-col>
      <van-col span="16">
        <div class="name"><span>{{ article.author }}</span></div>
        <div class="hospital"><span>{{ article.categoryName }}</span></div>
      </van-col>
      <van-col>
        <div class="read-count"><span>阅读 {{ article.readCount }}</span></div>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="22">
        <div class="content">
          <div class="title"><span>{{ article.title }}</span></div>
        </div>
      </van-col>
    </van-row>
    <van-row>
      <van-col>
        <div class="cover">
          <van-image width="100%" height="100%" :src="article.cover"/>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: ['article'],
  methods: {
    handleClick() {
      this.$emit('click', this.article.id)
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  border-radius: 10px
  margin: 8px 8px
  background-color: white

  .avatar
    margin-top: 10px
    margin-left: 10px
    height: 40px
    width: 40px

    ::v-deep .van-image__img
      border-radius: 20px

  .name
    margin-top: 10px
    margin-bottom: 2px
    font-size: 14px

  .hospital
    font-size: 12px
    color: grey

  .title
    margin-left: 10px
    margin-top: 6px
    font-size: 16px
    font-weight: 550
    color: rgba(0, 0, 0, 0.84)

  .label
    margin-left: 10px
    font-size: 12px
    border-radius: 10px
    margin-top: 10px
    color: #2d70fc

    span
      padding: 6px
      margin: 3px
      background-color: rgba(128, 128, 128, 0.08)
      border-radius: 10px

  .cover
    margin-bottom: 20px
    margin-right: 10px
    position: relative
    right: -8px
    top: 4px
    height: 100px
    width: 160px

  .read-count
    font-size: 12px
    margin-left: 10px
    color: rgba(128, 128, 128, 0.92)
    margin-top: 20px
</style>
