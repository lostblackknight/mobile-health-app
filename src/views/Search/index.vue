<template>
  <div :class="hiddenHistory || hasSearchResult ? 'container container-bgc-grey' : 'container'">
    <!-- 头部搜索栏-->
    <div class="header">
      <form action="/">
        <van-search
          v-model="keyword"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          @input="handleInput"
        />
      </form>
    </div>

    <!-- 查询建议 -->
    <div v-if="hiddenHistory && !hasSearchResult" class="search-suggest">
      <ul class="suggest-list">
        <li>莎迪阿德勒</li>
        <li>是对爱的渴望</li>
        <li>sd爱德华</li>
        <li>山东矮达</li>
        <li>史都安德</li>
        <li>圣诞阿蒂拉</li>
        <li>闪电爱逗比</li>
        <li>沙雕爱豆</li>
        <li>上单奥迪</li>
        <li>食道癌的早期症状</li>
      </ul>
    </div>

    <!-- 历史记录-->
    <div v-if="!hiddenHistory && !hasSearchResult" class="history">
      <div class="line"></div>
      <div class="search-history">
        <div class="title">
          搜索历史
        </div>
        <ul class="search-list" v-if="hasHistory">
          <li @click="onSearch(history)" v-for="(history, index) in searchHistory" :key="index">
            <van-icon class="left-icon" name="browsing-history-o"/>
            <a> {{ history }}</a>
          </li>
        </ul>
      </div>
      <div class="clear-history" v-if="hasHistory">
        <a @click="handleClearHistory">清除历史记录</a>
      </div>
    </div>

    <div v-if="hasSearchResult" class="search-result">
      <search-result/>
    </div>

  </div>
</template>

<script>

import SearchResult from '@/views/Search/SearchResult'
import { getList, clearList, setList } from '@/utils/cache'

export default {
  name: 'Search',
  components: { SearchResult },
  data() {
    return {
      keyword: '',
      hiddenHistory: false,
      hasSearchResult: false,
      hasHistory: true,
      searchHistory: []
    }
  },
  watch: {
    keyword(keyword) {
      if (keyword.length === 0) {
        this.handleClear()
      }
    }
  },
  created() {
    this.keyword = this.$route.query.keyword ? this.$route.query.keyword : ''
    // 查询历史记录
    this.getSearchHistory()
  },
  methods: {
    getSearchHistory() {
      if (getList('search-history')) {
        this.hasHistory = true
        this.searchHistory = getList('search-history').reverse()
      } else {
        this.hasHistory = false
      }
    },
    onSearch(val) {
      if (val === '') return
      const query = this.$route.query
      this.keyword = val
      if (query.keyword !== undefined && query.keyword === val) {
        // 历史记录导致路由重复 BUG 解决
        this.hasSearchResult = true
      } else {
        this.$router.replace({
          path: '/search',
          query: {
            ...query,
            keyword: val
          }
        })
        this.hasSearchResult = true
        setList('search-history', val)
      }
    },
    onCancel() {
      this.$router.push('/home')
    },
    handleInput() {
      this.hiddenHistory = true
    },
    handleClear() {
      this.hiddenHistory = false
      const query = { ...this.$route.query }
      if (query.keyword !== undefined) {
        // 清除地址栏上的 keyword
        delete query.keyword
        this.$router.replace({
          path: '/search',
          query: {
            ...query
          }
        })
        this.hasSearchResult = false
      }
      this.getSearchHistory()
    },
    handleClearHistory() {
      clearList('search-history')
      this.getSearchHistory()
    }
  }
}
</script>

<style lang="sass" scoped>
.container-bgc-grey
  background-color: #f7f8fa !important

.container
  width: 100vw
  height: 100vh
  background-color: white

  .header
    background-color: white

  .line
    height: 10px
    background-color: #f7f8fa

  ::v-deep .van-search__action
    color: #2d70fc
    font-size: 4vw

    &:active
      background-color: white

  .search-suggest
    padding-left: 3.2vw
    background: #f7f8fa

    .suggest-list
      li
        height: 11.73333vw
        line-height: 11.73333vw
        border-bottom: 1px solid #ccc
        color: #212121
        font-size: 3.46667vw

  .search-history
    background-color: white

    .title
      height: 12.26667vw
      padding-left: 3.2vw
      line-height: 12.26667vw
      font-weight: 400
      color: #999
      font-size: 3.73333vw

    .search-list
      padding-left: 3.2vw

      li
        height: 11.73333vw
        line-height: 11.73333vw
        border-bottom: 1px solid #ccc

      a
        color: #505050
        font-size: 3.73333vw
        vertical-align: middle
        overflow: hidden

      .left-icon
        color: #999
        margin-right: 2.13333vw
        vertical-align: middle

  .clear-history
    box-sizing: border-box
    line-height: 12.26667vw
    text-align: center
    background-color: white

    a
      font-size: 3.73333vw
      color: #999

</style>
