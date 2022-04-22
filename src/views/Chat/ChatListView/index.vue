<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <list-item :item="item" @click="handleClick" v-for="item in list" :key="item.anotherId"/>
    </van-list>
  </div>
</template>

<script>
import ListItem from '@/views/Chat/ChatListView/ListItem'
import { getChatList, signMessage } from '@/api/message'

export default {
  name: 'ChatListView',
  components: { ListItem },
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      this.loading = true
      getChatList()
        .then(({ data }) => {
          this.list = data
          this.loading = false
          this.finished = true
        }).catch(() => {
          this.loading = false
          this.finished = true
        })
    },
    handleClick(item, unsignedMessage) {
      this.$router.push({
        path: `/whisper/${item.memberId}/${item.anotherId}`
      })
    }
  }
}
</script>

<style scoped>

</style>
