import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import viteCompression from 'vite-plugin-compression';
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  console.log("这是", VITE_APP_ENV == "development" ? "开发" : "线上", "环境");
  return {
    resolve: {
      alias: {
        // 设置别名
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      WindiCSS(),
      VueSetupExtend(),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }], // 自动导入vue和vue-router相关函数
        dts: "src/auto-import.d.ts" // 生成 `auto-import.d.ts` 全局声明
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ],
    server: {
      host: "0.0.0.0",
      proxy: {
        '/api': {
          target: 'http://ceshi13.dishait.cn',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
      // 取消计算文件大小，加快打包速度
      reportCompressedSize: true,
      sourcemap: false,
      // assetsDir: 'static/img',
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks(id) { //静态资源分拆打包
            if (id.includes('naive-ui')) {
                return;
            }
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        },
      },
    },
  }
})
