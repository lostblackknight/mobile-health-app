<template>
  <div class="container" @click="onClick">
    <van-row>
      <van-col>
        <div class="patient-name">
          <span>{{ order.patientName }}</span>
        </div>
      </van-col>
      <van-col>
        <div class="order-status" :style="statusStyle">
          <span>{{ getOrderStatus() }}</span>
        </div>
      </van-col>
    </van-row>
    <div class="line">
      <van-row>
        <van-col span="5"><span class="label">收款医院</span></van-col>
        <van-col><span style="color: #333">{{ order.hospitalName }}</span></van-col>
      </van-row>
    </div>
    <div class="line">
      <van-row>
        <van-col span="5"><span class="label">支付金额</span></van-col>
        <van-col><span style="color: #333">￥{{ order.amount }}</span></van-col>
      </van-row>
    </div>
    <div class="line">
      <van-row>
        <van-col span="5"><span class="label">订单号</span></van-col>
        <van-col><span class="create-time" style="color: #333">{{ order.orderSn }}</span></van-col>
      </van-row>
    </div>
    <div class="line">
      <van-row>
        <van-col span="5"><span class="label">创建时间</span></van-col>
        <van-col span="14"><span class="create-time" style="color: #333">{{ order.createTime }}</span></van-col>
        <van-col>
          <div class="detail">详情 ></div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderItem',
  props: ['order'],
  data() {
    let color = ''
    let backgroundColor = ''
    switch (this.order.orderStatus) {
      case 0:
        color = '#fe7823'
        backgroundColor = '#fdf0e5'
        break
      case 1:
        color = '#67C23A'
        backgroundColor = '#e1f3d8'
        break
      case -1:
        color = '#909399'
        backgroundColor = '#e9e9eb'
        break
      case -2:
        color = '#909399'
        backgroundColor = '#e9e9eb'
        break
      case 2:
        color = '#409eff'
        backgroundColor = '#d9ecff'
        break
    }
    return {
      statusStyle: {
        color: color,
        backgroundColor: backgroundColor
      }
    }
  },
  methods: {
    getOrderStatus() {
      switch (this.order.orderStatus) {
        case 0:
          return '待支付'
        case 1:
          return '已支付'
        case -1:
          return '已取消'
        case -2:
          return '已退款'
        case 2:
          return '已完成'
      }
    },
    onClick() {
      this.$emit('click', this.order.orderSn)
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  border-radius: 10px
  background-color: white
  border: 1px solid rgba(0, 0, 0, 0.05)
  margin-bottom: 10px

  .patient-name
    font-size: 18px
    font-weight: bold
    color: #333
    margin-top: 10px
    margin-left: 10px

  .order-status
    margin-top: 10px
    font-size: 16px
    position: absolute
    right: 10px
    padding: 2px 4px 2px 10px
    border-radius: 10px 0 0 10px

  .detail
    padding-left: 20px

  .line
    margin-left: 10px
    margin-top: 10px
    font-size: 16px
    color: #777777

    &:last-child
      padding-bottom: 10px

  .create-time
    position: relative
    top: 2px
</style>
