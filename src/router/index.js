import { createRouter, createWebHistory } from 'vue-router';




const routes = [
  //首页
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
    meta:{
      title:"登录"
    }
  },
  //404
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/404/index.vue"),
    meta:{
      title:"404"
    }
  },
  {
    path: "/",
    component: () => import("@/views/index.vue"),
    meta:{
      title:"首页"
    }
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;