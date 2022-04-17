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
    <div v-if="showSearchSuggest" class="search-suggest">
      <ul class="suggest-list">
        <li v-for="suggest in suggestList" :key="suggest" @click="onSearch(suggest)">{{ suggest }}</li>
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
      <search-result ref="result" :keyword="keyword" :city="city"/>
    </div>

  </div>
</template>

<script>

import SearchResult from '@/views/Search/SearchResult'
import { getList, clearList, setList } from '@/utils/cache'
import { getSuggest } from '@/api/search'

export default {
  name: 'Search',
  components: { SearchResult },
  data() {
    return {
      keyword: undefined,
      hiddenHistory: false,
      hasSearchResult: false,
      showSearchSuggest: false,
      hasHistory: true,
      searchHistory: [],
      timer: null,
      suggestList: [],
      city: undefined,
      firstSearch: true
    }
  },
  watch: {
    keyword(keyword) {
      if (keyword !== undefined && keyword.length === 0) {
        this.handleClear()
      }
    },
    $route: {
      handler: function(val, oldVal) {
        this.keyword = this.$route.query.keyword
        this.city = this.$route.query.city
        // 查询历史记录
        if (this.keyword === undefined) {
          this.hiddenHistory = false
          this.hasSearchResult = false
          this.getSearchHistory()
        } else {
          this.hiddenHistory = true
          this.hasSearchResult = true
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    this.keyword = this.$route.query.keyword
    this.city = this.$route.query.city
    // 查询历史记录
    if (this.keyword === undefined) {
      this.hiddenHistory = false
      this.hasSearchResult = false
      this.showSearchSuggest = false
      this.getSearchHistory()
    } else {
      this.hiddenHistory = true
      this.hasSearchResult = true
      this.showSearchSuggest = false
    }
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
      if (val === '' || val === undefined) return
      this.keyword = val
      this.$store.dispatch('search/setActive', 0)
      setList('search-history', val)
      this.hasSearchResult = true
      this.showSearchSuggest = false
      this.hiddenHistory = true
      this.firstSearch = false
      this.$router.push({
        path: '/search',
        query: {
          keyword: this.keyword,
          city: this.city
        }
      }).then(() => {
      }).catch(() => {
      })
    },
    onCancel() {
      this.$router.go(-1)
    },
    handleInput() {
      this.hiddenHistory = true
      this.showSearchSuggest = true
      this.hasSearchResult = false
      if (this.timer != null) {
        clearTimeout(this.timer)
      }
      setTimeout(() => {
        // 查询检索提示
        if (this.keyword !== undefined) {
          getSuggest(this.keyword)
            .then(({ data }) => {
              this.suggestList = data.suggest
            })
        }
      }, 500)
    },
    handleClear() {
      this.hiddenHistory = false
      this.hasSearchResult = false
      this.showSearchSuggest = false
      const query = { ...this.$route.query }
      if (query.keyword !== undefined) {
        // 清除地址栏上的 keyword
        delete query.keyword
        this.$router.push({
          path: '/search',
          query: {
            ...query
          }
        }).catch(() => {
        })
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
    z-index: 100
    position: absolute
    top: 54px
    left: 0
    right: 0

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
