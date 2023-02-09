import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    url: '/admin/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

//退出
export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post',
  })
}