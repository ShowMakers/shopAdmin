import router from "./router";
import { useUserStore } from '@/store';
import NProgress from "nprogress";
import "@/assets/styles/nprogress.scss";
import { getToken } from "@/utils/auth";

// import { constantRoutes } from "./router";

NProgress.configure({ showSpinner: false });
const whiteList = [];

router.beforeEach((to, from, next) => {
  NProgress.start();
  const token = getToken();
  const userStore = useUserStore();
  const title = (to.meta.title ? to.meta.title:"")+"-后台管理系统";
  // const title = to.meta.title ? to.meta.title : "";
  document.title = title;
  if (!token && to.path!="/login") {
     // 没有token
     if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      // window.$message.error("请先登录");
      // 否则全部重定向到登录页
      next({path:"/login"}); 
      NProgress.done();
    }
  }else if(token && to.path == "/login"){
    window.$message.error("请勿重新登录");
    next({path:from.path ? from.path : "/"});
  }else if(token){
     userStore.GetInfo();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
