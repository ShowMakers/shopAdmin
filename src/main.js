import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import router from "./router";
import { setupNaive } from '@/utils/NaiveUIComponents';
import "@/assets/styles/index.scss"; // global css
import store from './store';
import 'virtual:windi.css';


  const app = createApp(App)
  // 注册全局常用的 naive-ui 组件
  setupNaive(app);
  app.use(router);
  app.use(store);
  app.mount('#app');
