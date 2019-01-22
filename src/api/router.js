import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/router/getPageRouterList',
    method: 'get',
    params
  })
}

export function add(id, name, path, parentid) {
  return request({
    url: '/router/add',
    method: 'post',
    data: {
      id,
      name,
      path,
      parentid
    }
  })
}
export function selectRolesByid(id) {
  return request({
    url: '/router/selectRolesByid?id=' + id,
    method: 'get'
  })
}
export function delectByid(id) {
  return request({
    url: '/router/delectByid?id=' + id,
    method: 'get'
  })
}
export function findUserByid(id) {
  return request({
    url: '/router/findUserByid?id=' + id,
    method: 'get'
  })
}
