import { defineStore } from 'pinia';
import { login, logout } from '@/api/login';
import { getUserInfo } from '@/api/manager';
import { getToken, setToken, removeToken } from '@/utils/auth';
export const useUserStore = defineStore('user',{
  state: () => {
    return {
      token:getToken(),
      roles: [],
      permissions: [],
      userInfo:{}
    }
  },
  actions: {
    // 登录
    async Login(userInfo) {
      try {
        const { data } = await login(userInfo);
        setToken(data.token);
        this.token = data.token;
        this.GetInfo();
      } catch (error) {
        removeToken();
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
    // 退出系统
    async LogOut() {
      await logout();
      this.token = null;
      this.roles = null;
      this.permissions = null;
      removeToken();
    },
  }
});

// export default useUserStore;