import request from '@/utils/request'

//获取管理员信息
export function getUserInfo(data) {
  return request({
    url: '/admin/getinfo',
    method: 'post',
    data
  })
}

//修改密码
export function changePassword(data) {
  return request({
    url: '/admin/updatepassword',
    method: 'post',
    data
  })
}