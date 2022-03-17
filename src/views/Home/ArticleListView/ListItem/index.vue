<template>
  <div class="container">
    <van-row>
      <van-col span="4">
        <div class="avatar">
          <van-image round width="100%" height="100%" src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
        </div>
      </van-col>
      <van-col span="20">
        <div class="name"><span>吕小燕</span></div>
        <div class="hospital"><span>山西省中医院</span></div>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="16">
        <div class="content">
          <div class="title"><span>长期便秘苦不堪言，中医教你告别便秘</span></div>
          <div class="label">
            <span>#便秘</span>
            <span>#中医养生</span>
          </div>
          <div class="read-count"><span>阅读 936</span></div>
        </div>
      </van-col>
      <van-col span="8">
        <div class="cover">
          <van-image width="100%" height="100%" src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'ListItem'
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
    width: 100px

  .read-count
    font-size: 12px
    margin-left: 10px
    color: rgba(128, 128, 128, 0.92)
    position: relative
    bottom: -16px

  ::v-deep .van-image__img
    border-radius: 20px
</style>
