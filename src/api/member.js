import request from '@/utils/request'
import { getRefreshToken, getToken, setToken } from '@/utils/auth'
import axios from 'axios'

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

export function modifyMember(data) {
  return request({
    url: '/member/members',
    method: 'put',
    data
  })
}

export function authToDoctor(data) {
  return request({
    url: `/member/doctor/auth`,
    method: 'put',
    data
  })
}

export function getMemberById(id) {
  if (id === null || id === undefined) {
    return request({
      url: `/member/members/memberId`,
      method: 'get'
    })
  }
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

export function uploadImage(file) {
  const data = new FormData()
  data.append('file', file)
  return axios({
    url: process.env.VUE_APP_BASE_API + `/thirdparty/oss/upload/image`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getToken()}`
    }
  })
}
