<template>
  <div class="container">
    <div class="list-view">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          finished-text="没有更多了"
          :finished="finished"
          @load="onLoad"
        >
          <list-item :article="article" v-for="article in articleList" :key="article.id" @click="handleClick"/>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem'
import { getArticleList } from '@/api/search'

export default {
  name: 'ArticleListView',
  props: ['title', 'categoryId'],
  components: {
    ListItem
  },
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      error: false,
      articleList: [],
      pageNum: 1,
      pageSize: 5
    }
  },
  methods: {
    onLoad() {
      this.loading = false
      this.loading = true
      getArticleList({
        title: this.title,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        categoryId: this.categoryId
      })
        .then(({ data }) => {
          data.forEach(item => {
            this.articleList.push(item)
          })
          this.loading = false
          this.finished = true
          this.refreshing = false
          this.pageNum++
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    },
    handleClick(id) {
      this.$router.push(`/article/${id}`)
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      getArticleList({
        title: this.title,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        categoryId: this.categoryId
      })
        .then(({ data }) => {
          data.forEach(item => {
            this.articleList.push(item)
          })
          this.loading = false
          this.finished = true
          this.refreshing = false
          this.pageNum++
        })
        .catch(() => {
          this.loading = false
          this.error = true
        })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
