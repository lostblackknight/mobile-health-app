<template>
  <div class="container-a">
    <div class="nav-bar">
      <van-nav-bar
        title="缴费单"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="payment-tab">
      <van-tabs v-model="active" @change="onChange">
        <van-tab class="payment-tab-item" title="全部">
          <div v-if="orderList.length === 0" style="text-align: center; font-size: 18px;color: #777777">暂无数据</div>
          <order-item :order="order" v-for="order in orderList" :key="order.orderSn" @click="showDetail"/>
        </van-tab>
        <van-tab class="payment-tab-item" title="待支付">
          <div v-if="orderList.length === 0" style="text-align: center; font-size: 18px;color: #777777">暂无数据</div>
          <order-item @click="showDetail" :order="order" v-for="order in orderList" :key="order.orderSn"/>
        </van-tab>
        <van-tab class="payment-tab-item" title="已支付">
          <div v-if="orderList.length === 0" style="text-align: center; font-size: 18px;color: #777777">暂无数据</div>
          <order-item @click="showDetail" :order="order" v-for="order in orderList" :key="order.orderSn"/>
        </van-tab>
        <van-tab class="payment-tab-item" title="已退款">
          <div v-if="orderList.length === 0" style="text-align: center; font-size: 18px;color: #777777">暂无数据</div>
          <order-item @click="showDetail" :order="order" v-for="order in orderList" :key="order.orderSn"/>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import OrderItem from '@/views/Payment/OrderItem'
import { getOrderInfoByMemberId } from '@/api/order'

export default {
  name: 'Payment',
  components: { OrderItem },
  data() {
    return {
      active: 0,
      orderList: []
    }
  },
  created() {
    this.getOrderInfoByMemberId()
  },
  methods: {
    getOrderInfoByMemberId(params) {
      getOrderInfoByMemberId(params)
        .then(({ data }) => {
          this.orderList = data
        })
    },
    onClickLeft() {
      this.$router.push('/about')
    },
    showDetail(orderSn) {
      this.$router.push(`/order/detail/${orderSn}`)
    },
    onChange(name) {
      switch (name) {
        case 0:
          this.getOrderInfoByMemberId()
          break
        case 1:
          this.getOrderInfoByMemberId({ status: 0 })
          break
        case 2:
          this.getOrderInfoByMemberId({ status: 1 })
          break
        case 3:
          this.getOrderInfoByMemberId({ status: -2 })
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
