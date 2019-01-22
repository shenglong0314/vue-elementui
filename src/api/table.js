import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/selectUserList',
    method: 'get',
    params
  })
}
