import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import router from "./router";
import { setupNaive } from '@/utils/NaiveUIComponents';

  const app = createApp(App)

  // 注册全局常用的 naive-ui 组件
  setupNaive(app);
  app.use(router);
  app.mount('#app');
