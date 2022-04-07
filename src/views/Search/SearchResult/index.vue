<template>
  <div>
    <van-tabs v-model="active" color="#2d70fc" sticky title-active-color="#2d70fc">
      <van-tab title="综合">
        <article-list-view/>
      </van-tab>
      <van-tab title="医院">
        <article-list-view/>
      </van-tab>
      <van-tab title="科室">
        <article-list-view/>
      </van-tab>
      <van-tab title="医生">
        <article-list-view/>
      </van-tab>
      <van-tab title="文章">
        <article-list-view/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ArticleListView from '@/views/Home/ArticleListView'

export default {
  name: 'SearchResult',
  components: { ArticleListView },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>

</style>
