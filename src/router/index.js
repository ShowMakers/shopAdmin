import { createRouter, createWebHistory } from 'vue-router';

import Layout from "@/layout/index.vue";

const routes = [
   //登录
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
  //工作台-首页
  {
  // name: 'Dashboard',
  path: '/',
  component: Layout,
  redirect: '/workbench',
  children: [
    {
      name: 'Workbench',
      path: '/workbench',
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        title: '工作台',
        icon: 'mdi:home',
        order: 0,
      },
    },
  ],
  },
  // {
  //   path: "/",
  //   component: Layout,
  //   children:[
  //     {
  //       path: "/",
  //       component: () => import("@/views/index.vue"),
  //       meta:{
  //         title:"首页",
  //         icon: 'mdi:home',
  //       }
  //     }
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;