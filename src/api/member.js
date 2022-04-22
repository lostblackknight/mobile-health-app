import request from '@/utils/request'
import { getRefreshToken, setToken } from '@/utils/auth'

export function login(data) {
  return request({
    url: '/member/token',
    method: 'post',
    data
  })
}

export function loginBySms(data) {
  return request({
    url: '/member/token/sms',
    method: 'post',
    data
  })
}

export function tokenRefresh() {
  setToken(getRefreshToken())
  return request({
    url: '/member/token/refresh',
    method: 'get'
  })
}

export function getInfo() {
  return request({
    url: '/member/members/info',
    method: 'get'
  })
}

export function getMemberById(id) {
  return request({
    url: `/member/members/${id}`,
    method: 'get'
  })
}

export function sendCode(phone) {
  return request({
    url: `/member/sms/sendCode/${phone}`,
    method: 'get'
  })
}
