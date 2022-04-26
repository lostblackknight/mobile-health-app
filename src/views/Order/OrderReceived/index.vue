<template>
  <div class="container-a">
    <div class="nav-bar">
      <van-nav-bar
        title="我的问诊"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="payment-tab">
      <van-tabs v-model="active" @change="onChange">
        <van-tab class="payment-tab-item" title="未就诊">
          <div v-if="orderList.length === 0" style="text-align: center; font-size: 18px;color: #777777">暂无数据</div>
          <order-item @click="showDetail" :order="order" v-for="order in orderList" :key="order.orderSn"/>
        </van-tab>
        <van-tab class="payment-tab-item" title="已就诊">
          <div v-if="orderList.length === 0" style="text-align: center; font-size: 18px;color: #777777">暂无数据</div>
          <order-item @click="showDetail" :order="order" v-for="order in orderList" :key="order.orderSn"/>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getClosedOrder, getReceivedOrder } from '@/api/order'
import OrderItem from '@/views/Payment/OrderItem'

export default {
  name: 'OrderReceived',
  components: {
    OrderItem
  },
  data() {
    return {
      active: 0,
      orderList: []
    }
  },
  created() {
    getReceivedOrder()
      .then(({ data }) => {
        this.orderList = data
      })
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    showDetail(orderSn, memberId) {
      this.$router.push(`/order/detail/${orderSn}/${memberId}`)
    },
    onChange(name) {
      switch (name) {
        case 0:
          getReceivedOrder()
            .then(({ data }) => {
              this.orderList = data
            })
          break
        case 1:
          getClosedOrder()
            .then(({ data }) => {
              this.orderList = data
            })
          break
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.container-a
  height: 100%

  .payment-tab
    .payment-tab-item
      padding: 10px 10px 10px 10px
</style>
