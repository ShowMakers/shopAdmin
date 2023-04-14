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

//获取管理员信息和权限菜单
export function getMenu() {
  return request({
    url: '/admin/getinfo',
    method: 'post',
  })
}