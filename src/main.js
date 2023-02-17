import "./permission";
import 'virtual:windi.css';
import App from './App.vue';
import '@/assets/styles/reset.css';
import { setupStore } from '@/store'
import router from "./router";
import { createApp } from 'vue';
import "@/assets/styles/index.scss"; // global css
import { setupNaive } from '@/utils/NaiveUIComponents';
  const app = createApp(App)
  // 注册全局常用的 naive-ui 组件
  setupNaive(app);
  app.use(router);
  setupStore(app);
  app.mount('#app');
