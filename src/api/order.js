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

export function getOrderDetailByOrderSnAndMemberId(orderSn, memberId) {
  return request({
    url: `/order/orders/${memberId}/${orderSn}`,
    method: 'get'
  })
}

export function getClosedOrder() {
  return request({
    url: `/order/orders/closed`,
    method: 'get'
  })
}

export function closeOrder(orderSn) {
  return request({
    url: `/order/orders/close/${orderSn}`,
    method: 'put'
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

export function getReceivedOrder() {
  return request({
    url: `/order/orders/received`,
    method: 'get'
  })
}

export function checkBooking(scheduleId) {
  return request({
    url: `/order/orders/check/booking/${scheduleId}`,
    method: 'get'
  })
}
