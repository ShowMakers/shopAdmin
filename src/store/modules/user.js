import { defineStore } from 'pinia';
import { login, logout } from '@/api/login';
import { getUserInfo,changePassword } from '@/api/manager';
import { getToken, setToken, removeToken } from '@/utils/auth';

// 定义用户存储
export const useUserStore = defineStore('user',{
  state: () => ({
    token: getToken(),
    roles: [],
    permissions: [],
    userInfo: {}
  }),
  actions: {
    // 登录
    async Login(userInfo) {
      try {
        const { data } = await login(userInfo);
        setToken(data.token);
        this.token = data.token;
      } catch (error) {
        throw error;
      }
    },
    // 获取用户信息
    async GetInfo() {
      try {
        const { data } = await getUserInfo();
        this.userInfo = data;
      } catch (error) {
        throw error;
      }
    },
    // 修改密码
    async UpdatePassword(info) {
      try {
        await changePassword(info);
      } catch (error) {
        throw error;
      }
    },
    // 退出系统
    async LogOut() {
      this.userInfo = {};
      this.roles = [];
      this.permissions = [];
      removeToken();
      try {
        await logout();
      } catch (error) {
        throw error;
      }
    },
  }
});
