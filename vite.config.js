import path from "path";
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import WindiCSS from 'vite-plugin-windicss';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig, loadEnv } from 'vite';
import AutoImport from "unplugin-auto-import/vite";
import IconsResolver from 'unplugin-icons/resolver';
import Components from "unplugin-vue-components/vite";
import viteCompression from 'vite-plugin-compression';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';
import Inspect from 'vite-plugin-inspect';
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
        imports: ['vue', 'vue-router', 'vue-i18n',"pinia", '@vueuse/core'], // 自动导入vue和vue-router相关函数
        dts: "src/auto-import.d.ts" // 生成 `auto-import.d.ts` 全局声明
      }),
      Components({
        resolvers: [
          NaiveUiResolver(),
          IconsResolver({componentPrefix: 'icon' }),
          VueUseComponentsResolver()
        ]
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true,
      }),
      Inspect({})
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
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 在生产环境移除console.log
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: false,
          pure_funcs: ['console.log', 'console.info'],
          drop_debugger: true,
        },
      },
      assetsDir: 'static/assets',
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/assets/styles/variables.scss";
        `,
          javascriptEnabled: true,
        },
      },
    },
  }
})
