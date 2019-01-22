import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/roles/getPageRolesList',
    method: 'get',
    params
  })
}

export function add(id, name) {
  return request({
    url: '/roles/add',
    method: 'post',
    data: {
      id,
      name
    }
  })
}
export function selectRolesByid(id) {
  return request({
    url: '/roles/selectRolesByid?id=' + id,
    method: 'get'
  })
}
export function delectByid(id) {
  return request({
    url: '/roles/delectByid?id=' + id,
    method: 'get'
  })
}
export function findUserByid(id) {
  return request({
    url: '/user/findUserByid?id=' + id,
    method: 'get'
  })
}
