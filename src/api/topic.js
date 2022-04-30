import request from '@/utils/request'

export function getCategoryList() {
  return request({
    url: `/topic/category/list`,
    method: 'get'
  })
}

export function isLike(id) {
  return request({
    url: `/topic/article/like/${id}`,
    method: 'get'
  })
}

export function isStar(id) {
  return request({
    url: `/topic/article/star/${id}`,
    method: 'get'
  })
}

export function getUserArticleLikeList() {
  return request({
    url: `/topic/article/user/like/list`,
    method: 'get'
  })
}

export function getUserArticleStarList() {
  return request({
    url: `/topic/article/user/star/list`,
    method: 'get'
  })
}

export function getUserArticleReadList() {
  return request({
    url: `/topic/article/user/read/list`,
    method: 'get'
  })
}

export function confirmLike(articleId) {
  return request({
    url: `/topic/article/confirm/like/${articleId}`,
    method: 'put'
  })
}

export function cancelLike(articleId) {
  return request({
    url: `/topic/article/cancel/like/${articleId}`,
    method: 'put'
  })
}

export function confirmStar(articleId) {
  return request({
    url: `/topic/article/confirm/star/${articleId}`,
    method: 'put'
  })
}

export function cancelStar(articleId) {
  return request({
    url: `/topic/article/cancel/star/${articleId}`,
    method: 'put'
  })
}

export function confirmRead(articleId) {
  return request({
    url: `/topic/article/confirm/read/${articleId}`,
    method: 'put'
  })
}
