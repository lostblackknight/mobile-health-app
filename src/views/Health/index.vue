<template>
  <div class="container">
    <div class="header">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
    <div class="nav-bar">
      <van-tabs v-model="active" color="#2d70fc" :title-inactive-color="'black'" sticky title-active-color="#2d70fc">
        <van-tab title="食品健康">
          <article-tag/>
          <article-list-view/>
        </van-tab>
        <van-tab title="运动养生">
          <article-tag/>
          <article-list-view/>
        </van-tab>
        <van-tab title="体重控制">
          <article-tag/>
          <article-list-view/>
        </van-tab>
        <van-tab title="慢性疾病">
          <article-tag/>
          <article-list-view/>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import ArticleTag from '@/views/Health/ArticleTag'
import ArticleListView from '@/views/Home/ArticleListView'

export default {
  name: 'Health',
  components: { ArticleListView, ArticleTag },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  height: 100%
  background-color: #f7f8fa

  .header
    .my-swipe .van-swipe-item
      color: #fff
      font-size: 20px
      line-height: 180px
      text-align: center
      background-color: #39a9ed

  .nav-bar
    color: black
</style>
