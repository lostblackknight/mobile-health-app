<template>
  <div class="article-tag">
    <div class="article-tag-item">健康</div>
    <div class="article-tag-item">健康</div>
    <div class="article-tag-item">健康</div>
    <div class="article-tag-item">健康</div>
    <div class="article-tag-item">健康</div>
    <div class="article-tag-item">健康</div>
    <div class="article-tag-item">健康</div>
    <div class="article-tag-item">健康</div>
    <div class="article-tag-item">健康</div>
    <div class="article-tag-item">健康</div>
  </div>
</template>

<script>
export default {
  name: 'ArticleTag'
}
</script>

<style lang="sass" scoped>
.article-tag
  white-space: nowrap
  padding: 8px 0
  overflow-y: auto

  &::-webkit-scrollbar
    display: none

  .article-tag-item
    width: 40px
    border-radius: 20px
    margin-left: 10px
    padding: 2px
    height: 20px
    font-size: 14px
    text-align: center
    background-color: rgba(180, 180, 180, 0.29)
    display: inline-block
    &:last-child
      margin-right: 10px
</style>
