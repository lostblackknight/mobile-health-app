<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="健康科普"
        fixed
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="main">
      <div class="title">{{ article.title }}</div>
      <van-row>
        <van-col span="18">
          <div class="category">文章类型：{{ article.categoryName }}</div>
        </van-col>
        <van-col>
          <div class="read-count">浏览数量：{{ article.readCount === null ? '0' : article.readCount}}</div>
        </van-col>
      </van-row>
      <div class="intro">
        <van-row>
          <van-col span="5">
            <div class="avatar">
              <van-image width="100%" height="100%" :src="article.avatar"/>
            </div>
          </van-col>
          <van-col span="13">
            <div class="author">
              {{ article.author }}
            </div>
          </van-col>
          <van-col span="3">
            <div :class="like ? 'like' : 'unLike'" @click="handleLike(article.id)">
              <van-icon name="like"/>
            </div>
          </van-col>
          <van-col>
            <div :class="star ? 'star' : 'unStar'">
              <van-icon name="star" @click="handleStar(article.id)"/>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="content" v-html="article.content">

      </div>
    </div>
  </div>
</template>

<script>
import { getArticleList } from '@/api/search'
import { cancelLike, cancelStar, confirmLike, confirmRead, confirmStar, isLike, isStar } from '@/api/topic'

export default {
  name: 'Article',
  data() {
    return {
      article: {
        id: undefined,
        author: undefined,
        avatar: undefined,
        categoryId: undefined,
        categoryName: undefined,
        collectionCount: 0,
        content: undefined,
        cover: undefined,
        likeCount: 0,
        readCount: 0,
        role: undefined,
        title: undefined,
        uid: undefined
      },
      like: false,
      star: false
    }
  },
  created() {
    this.id = this.$route.params.id
    getArticleList({
      id: this.id
    }).then(({ data }) => {
      this.article = data[0]
    })
    isLike(this.id).then(({ data }) => {
      this.like = data
    })
    isStar(this.id).then(({ data }) => {
      this.star = data
    })
    confirmRead(this.id)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    handleLike(id) {
      if (this.like) {
        // 喜欢状态，去取消
        cancelLike(id).then(() => {
          this.like = false
        })
      } else {
        // 不喜欢，去添加
        confirmLike(id).then(() => {
          this.like = true
        })
      }
    },
    handleStar(id) {
      if (this.star) {
        // 喜欢状态，去取消
        cancelStar(id).then(() => {
          this.star = false
        })
      } else {
        // 不喜欢，去添加
        confirmStar(id).then(() => {
          this.star = true
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  .main
    margin-top: 46px

    .title
      margin: 60px 10px 10px 14px
      font-size: 20px
      font-weight: bold
      color: #333

    .category
      margin-left: 14px
      font-size: 13px
      margin-top: 10px
      color: #777

    .read-count
      font-size: 13px
      margin-top: 10px
      color: #777

    .unLike
      margin-top: 12px
      font-size: 22px
      color: #61666d

    .unStar
      margin-top: 10.5px
      font-size: 22px
      color: #61666d

    .like
      margin-top: 12px
      font-size: 22px
      color: rgba(255, 0, 0, 0.66)

    .star
      margin-top: 10.5px
      font-size: 22px
      color: rgba(255, 255, 0, 0.66)

    .intro
      margin: 20px
      background-color: #f7f8fa
      padding: 10px
      border-radius: 10px

      .avatar
        width: 50px
        height: 50px
        margin-left: 10px

      .author
        margin-top: 11px
        font-size: 16px
        font-weight: bold
        color: #333

      ::v-deep .van-image__img
        border-radius: 20px

    .content
      padding: 0 20px 20px 20px

      ::v-deep pre
        position: relative
        white-space: pre-wrap !important
        word-wrap: break-word !important

      ::v-deep img
        width: 240px
        margin: 8px
</style>
