import request from '@/utils/request'

export function addUser(id, username, password) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data: {
      id,
      username,
      password
    }
  })
}
export function eidtUser(id) {
  return request({
    url: '/user/editUser?id=' + id,
    method: 'get'
  })
}
export function deleteUserByid(id) {
  return request({
    url: '/user/deleteUserByid?id=' + id,
    method: 'get'
  })
}
export function findUserByid(id) {
  return request({
    url: '/user/findUserByid?id=' + id,
    method: 'get'
  })
}
