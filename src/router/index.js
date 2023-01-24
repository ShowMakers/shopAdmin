import { createRouter, createWebHistory } from 'vue-router';




const routes = [
  //首页
  {
    path: "/",
    component: () => import("@/views/login.vue"),
  },
  //404
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/404/index.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;