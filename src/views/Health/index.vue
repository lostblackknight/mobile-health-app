<template>
  <div class="container">
    <div class="header">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <div class="swipe-item" v-for="article in articleList" :key="article.id" @click="handleClick(article)">
          <van-swipe-item>
            <van-image width="100%" height="100%" :src="article.cover"/>
          </van-swipe-item>
        </div>
      </van-swipe>
    </div>
    <div class="nav-bar">
      <van-tabs v-model="active" color="#2d70fc" :title-inactive-color="'black'" sticky title-active-color="#2d70fc">
        <van-tab v-for="category in categoryList" :key="category.id" :title="category.name">
          <article-list-view :category-id="category.id"/>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import ArticleListView from '@/views/Search/ArticleListView'
import { getCategoryList } from '@/api/topic'
import { getArticleList } from '@/api/search'

export default {
  name: 'Health',
  components: { ArticleListView },
  data() {
    return {
      active: 0,
      categoryList: [],
      articleList: []
    }
  },
  created() {
    getCategoryList()
      .then(({ data }) => {
        this.categoryList = data
      })

    getArticleList({
      pageNum: 1,
      pageSize: 4
    }).then(({ data }) => {
      this.articleList = data
    })
  },
  methods: {
    handleClick(article) {
      this.$router.push(`/article/${article.id}`)
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  height: 100%
  background-color: #f7f8fa

  .header
    .swipe-item
      height: 180px

  .nav-bar
    color: black
</style>
