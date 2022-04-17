import request from '@/utils/request'

export function getPatientsByMemberId() {
  return request({
    url: '/member/patients/memberId',
    method: 'get'
  })
}

export function createPatient(patient) {
  return request({
    url: '/member/patients',
    method: 'post',
    data: patient
  })
}

export function modifyPatient(patient) {
  return request({
    url: '/member/patients',
    method: 'put',
    data: patient
  })
}

export function getPatientById(id) {
  return request({
    url: `/member/patients/${id}`,
    method: 'get'
  })
}

export function deletePatientById(id) {
  return request({
    url: `/member/patients/${id}`,
    method: 'delete'
  })
}
