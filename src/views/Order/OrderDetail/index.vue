<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="订单详情"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="order-detail">
      <van-cell-group inset>
        <van-cell>
          <template #title>
            <van-row>
              <van-col span="7">
                预约序号
              </van-col>
              <van-col style="color: #969799" span="8">
                {{ order.number }}
              </van-col>
              <van-col>
                <div class="order-status" :style="statusStyle">
                  <span>{{ getOrderStatus() }}</span>
                </div>
              </van-col>
            </van-row>
          </template>
        </van-cell>
        <van-cell title="就诊人" :value="order.patientName"/>
        <van-cell title="就诊人电话" :value="order.patientPhone"/>
        <van-cell title="就诊时间" :value="(formatDate(order.reserveDate) + (order.reserveTime === 0 ? ' 上午': ' 下午'))"/>
        <van-cell title="就诊医生" :value="order.doctorName" is-link :to="`/doctor/${order.hospitalCode}/${order.deptCode}/${order.doctorCode}`"/>
        <van-cell title="就诊科室" :value="order.deptName" is-link :to="`/schedule/${order.hospitalCode}/${order.deptCode}`"/>
        <van-cell title="就诊医院" :value="order.hospitalName" is-link :to="`/hospital/${order.hospitalCode}`"/>
        <van-cell title="挂号费" :value="order.amount"/>
        <van-cell title="订单号" :value="order.orderSn"/>
        <van-cell title="下单时间" :value="order.createTime"/>
      </van-cell-group>
    </div>
    <div class="handle">
      <div style="margin: 16px;" v-if="order.orderStatus === 0 ">
        <van-row>
          <van-col span="10">
            <van-button round block type="info" native-type="submit" @click="onCancel(order.orderStatus, order.orderSn)">取消预约</van-button>
          </van-col>
          <van-col span="4"></van-col>
          <van-col span="10">
            <van-button round block type="info" native-type="submit" @click="onPay(order.orderStatus, order.orderSn)">立即支付</van-button>
          </van-col>
        </van-row>
      </div>
      <div style="margin: 16px;" v-if="order.orderStatus === 1 && $store.getters.roles.indexOf('doctor') === -1" >
        <van-button round block type="info" native-type="submit" @click="onCancel(order.orderStatus, order.orderSn)">取消预约</van-button>
      </div>
      <div style="margin: 16px;" v-if="order.orderStatus === 1 && $store.getters.roles.indexOf('doctor') !== -1">
        <van-button round block type="info" native-type="submit" @click="onClose(order.orderStatus, order.orderSn)">完成订单</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { cancelBooking, closeOrder, getOrderDetailByOrderSn, getOrderDetailByOrderSnAndMemberId, pay } from '@/api/order'
import moment from 'moment'

export default {
  name: 'OrderDetail',
  data() {
    return {
      order: {
        amount: undefined,
        createTime: undefined,
        deptCode: undefined,
        deptName: undefined,
        doctorCode: undefined,
        doctorMemberId: undefined,
        doctorName: undefined,
        hospitalCode: undefined,
        hospitalName: undefined,
        id: undefined,
        isDeleted: undefined,
        levelName: undefined,
        memberId: undefined,
        number: undefined,
        orderSn: undefined,
        orderStatus: undefined,
        patientId: undefined,
        patientName: undefined,
        patientPhone: undefined,
        quitTime: undefined,
        recordId: undefined,
        reserveDate: undefined,
        reserveTime: undefined,
        scheduleId: undefined,
        updateTime: undefined
      },
      statusStyle: {
        color: '',
        backgroundColor: ''
      }
    }
  },
  created() {
    if (this.$route.params.memberId === null || this.$route.params.memberId === undefined) {
      getOrderDetailByOrderSn(this.$route.params.OrderSn)
        .then(({ data }) => {
          this.order = data
          switch (this.order.orderStatus) {
            case 0:
              this.statusStyle.color = '#fe7823'
              this.statusStyle.backgroundColor = '#fdf0e5'
              break
            case 1:
              this.statusStyle.color = '#67C23A'
              this.statusStyle.backgroundColor = '#e1f3d8'
              break
            case -1:
              this.statusStyle.color = '#909399'
              this.statusStyle.backgroundColor = '#e9e9eb'
              break
            case -2:
              this.statusStyle.color = '#909399'
              this.statusStyle.backgroundColor = '#e9e9eb'
              break
            case 2:
              this.statusStyle.color = '#409eff'
              this.statusStyle.backgroundColor = '#d9ecff'
              break
          }
        })
    } else {
      getOrderDetailByOrderSnAndMemberId(this.$route.params.OrderSn, this.$route.params.memberId)
        .then(({ data }) => {
          this.order = data
          switch (this.order.orderStatus) {
            case 0:
              this.statusStyle.color = '#fe7823'
              this.statusStyle.backgroundColor = '#fdf0e5'
              break
            case 1:
              this.statusStyle.color = '#67C23A'
              this.statusStyle.backgroundColor = '#e1f3d8'
              break
            case -1:
              this.statusStyle.color = '#909399'
              this.statusStyle.backgroundColor = '#e9e9eb'
              break
            case -2:
              this.statusStyle.color = '#909399'
              this.statusStyle.backgroundColor = '#e9e9eb'
              break
            case 2:
              this.statusStyle.color = '#409eff'
              this.statusStyle.backgroundColor = '#d9ecff'
              break
          }
        })
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    formatDate(date) {
      return moment(date).format('yyyy-MM-DD')
    },
    onCancel(status, orderSn) {
      cancelBooking(orderSn)
        .then(({ message }) => {
          this.$toast(message)
          this.$router.replace('/payment')
        })
        .catch(({ message }) => {
          this.$toast(message)
        })
    },
    onClose(status, orderSn) {
      closeOrder(orderSn)
        .then(({ message }) => {
          this.$toast(message)
          this.$router.replace('/order/received')
        })
        .catch(({ message }) => {
          this.$toast(message)
        })
    },
    onPay(status, orderSn) {
      pay(orderSn)
        .then(({ data }) => {
          const selector = document.querySelector('body')
          selector.innerHTML = data.form
          document.forms[0].submit()
        })
    },
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
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: #f7f8fa

  .order-detail
    margin-top: 20px

    .order-status
      position: relative
      right: -70px
      font-size: 16px
      padding: 2px 4px 2px 10px
      border-radius: 10px 0 0 10px
</style>
