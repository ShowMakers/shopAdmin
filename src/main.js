import "./permission";
import 'virtual:windi.css';
import App from './App.vue';
import '@/assets/styles/reset.css';
import { setupStore } from '@/store'
import router from "./router";
import { createApp } from 'vue';
import "@/assets/styles/index.scss"; // global css
import { setupNaive } from '@/utils/NaiveUIComponents';
import autofit from "autofit.js";
  const app = createApp(App)
  // TODO:目前引入autoFit会导致页面无法正常显示(高度有变化，他会给页面一个transform来调整，但是目前有问题)，暂时注释掉
  // autofit.init({
  //   designHeight: 1080,
  //   designWidth: 1920,
  //   renderDom:app,
  //   resize: true
  // })

  // 注册全局常用的 naive-ui 组件
  setupNaive(app);
  app.use(router);
  setupStore(app);

  app.mount('#app');
