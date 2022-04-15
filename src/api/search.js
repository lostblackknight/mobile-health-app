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

export function getScheduleDateList(hospitalCode, deptCode) {
  return request({
    url: '/search/schedule/dateList',
    method: 'get',
    params: { hospitalCode, deptCode }
  })
}

export function getDoctorList(hospitalCode, deptCode, date) {
  return request({
    url: '/search/schedule/doctorList',
    method: 'get',
    params: { hospitalCode, deptCode, date }
  })
}

