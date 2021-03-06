import request from '@/utils/request'

export function getSuggest(keyword) {
  return request({
    url: '/search/suggest',
    method: 'get',
    params: { keyword: keyword }
  })
}

export function getHospital(params) {
  return request({
    url: '/search/hospital',
    method: 'get',
    params: params
  })
}

export function getDeptList(hospitalCode) {
  return request({
    url: '/search/dept/classList',
    method: 'get',
    params: { hospitalCode: hospitalCode }
  })
}

export function getDept(params) {
  return request({
    url: '/search/dept',
    method: 'get',
    params: params
  })
}

export function getArticleList(params) {
  return request({
    url: '/search/article',
    method: 'get',
    params: params
  })
}

export function getScheduleDateList(hospitalCode, deptCode, date) {
  return request({
    url: '/search/schedule/dateList',
    method: 'get',
    params: {
      hospitalCode,
      deptCode,
      date
    }
  })
}

export function getDoctorList(hospitalCode, deptCode, date) {
  return request({
    url: '/search/schedule/doctorList',
    method: 'get',
    params: {
      hospitalCode,
      deptCode,
      date
    }
  })
}

export function getSchedule(params) {
  return request({
    url: '/search/schedule',
    method: 'get',
    params: params
  })
}

export function getDeptListByDoctorCode(params) {
  return request({
    url: '/search/schedule/doctor/deptList',
    method: 'get',
    params: params
  })
}

export function getDoctorSchedule(params) {
  return request({
    url: '/search/schedule/doctor/schedule',
    method: 'get',
    params: params
  })
}

export function getDoctorListByDoctorName(params) {
  return request({
    url: '/search/schedule/doctorList',
    method: 'get',
    params: params
  })
}

