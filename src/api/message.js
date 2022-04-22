import request from '@/utils/request'

export function createChat(data) {
  return request({
    url: '/message/chats',
    method: 'post',
    data
  })
}

export function isFirstChat(anotherId) {
  return request({
    url: `/message/chats/first/${anotherId}`,
    method: 'get'
  })
}

export function getChatList() {
  return request({
    url: `/message/chats/list/memberId`,
    method: 'get'
  })
}

export function getMessageList(fromId, toId) {
  return request({
    url: `/message/messages/list/${fromId}/${toId}`,
    method: 'get'
  })
}

export function getAllUnSignedMessage() {
  return request({
    url: `/message/messages/unsigned/all`,
    method: 'get'
  })
}

export function getUnsignedMessage(fromId, toId) {
  return request({
    url: `/message/messages/unsigned/${fromId}/${toId}`,
    method: 'get'
  })
}

export function getLastMessageDetail(fromId, toId) {
  return request({
    url: `/message/messages/lasted/${fromId}/${toId}`,
    method: 'get'
  })
}

export function signMessage(data) {
  return request({
    url: `/message/messages/sign`,
    method: 'put',
    data
  })
}
