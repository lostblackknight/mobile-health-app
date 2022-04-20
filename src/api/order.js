import request from '@/utils/request'

export function createOrder(scheduleId, patientId) {
  return request({
    url: `/order/orders/${scheduleId}/${patientId}`,
    method: 'post'
  })
}

export function getOrderDetailByOrderSn(orderSn) {
  return request({
    url: `/order/orders/${orderSn}`,
    method: 'get'
  })
}

export function pay(orderSn) {
  return request({
    url: `/order/payment/${orderSn}`,
    method: 'post'
  })
}

export function cancelBooking(orderSn) {
  return request({
    url: `/order/orders/cancel/${orderSn}`,
    method: 'put'
  })
}

export function getOrderInfoByMemberId(params) {
  if (params === undefined) {
    return request({
      url: `/order/orders/memberId`,
      method: 'get'
    })
  }
  return request({
    url: `/order/orders/memberId`,
    method: 'get',
    params: params
  })
}

export function getOrderInfoByMemberIdRecord(params) {
  return request({
    url: `/order/orders/memberId/record`,
    method: 'get',
    params: params
  })
}
