import request from '@/utils/request'

export function getCategoryList() {
  return request({
    url: `/topic/category/list`,
    method: 'get'
  })
}
