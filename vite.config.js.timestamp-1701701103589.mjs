// vite.config.js
import path from "path";
import vue from "file:///F:/%E5%89%8D%E7%AB%AF/shopAdmin/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.0.4+vue@3.2.45/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Icons from "file:///F:/%E5%89%8D%E7%AB%AF/shopAdmin/node_modules/.pnpm/unplugin-icons@0.15.2/node_modules/unplugin-icons/dist/vite.mjs";
import WindiCSS from "file:///F:/%E5%89%8D%E7%AB%AF/shopAdmin/node_modules/.pnpm/vite-plugin-windicss@1.8.10_vite@4.0.4/node_modules/vite-plugin-windicss/dist/index.mjs";
import vueJsx from "file:///F:/%E5%89%8D%E7%AB%AF/shopAdmin/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.0_vite@4.0.4+vue@3.2.45/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { defineConfig, loadEnv } from "file:///F:/%E5%89%8D%E7%AB%AF/shopAdmin/node_modules/.pnpm/vite@4.0.4_sass@1.57.1+terser@5.16.3/node_modules/vite/dist/node/index.js";
import AutoImport from "file:///F:/%E5%89%8D%E7%AB%AF/shopAdmin/node_modules/.pnpm/unplugin-auto-import@0.12.1_@vueuse+core@9.12.0/node_modules/unplugin-auto-import/dist/vite.js";
import IconsResolver from "file:///F:/%E5%89%8D%E7%AB%AF/shopAdmin/node_modules/.pnpm/unplugin-icons@0.15.2/node_modules/unplugin-icons/dist/resolver.mjs";
import Components from "file:///F:/%E5%89%8D%E7%AB%AF/shopAdmin/node_modules/.pnpm/unplugin-vue-components@0.22.12_vue@3.2.45/node_modules/unplugin-vue-components/dist/vite.mjs";
import viteCompression from "file:///F:/%E5%89%8D%E7%AB%AF/shopAdmin/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.0.4/node_modules/vite-plugin-compression/dist/index.mjs";
import VueSetupExtend from "file:///F:/%E5%89%8D%E7%AB%AF/shopAdmin/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@4.0.4/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import { NaiveUiResolver } from "file:///F:/%E5%89%8D%E7%AB%AF/shopAdmin/node_modules/.pnpm/unplugin-vue-components@0.22.12_vue@3.2.45/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { VueUseComponentsResolver } from "file:///F:/%E5%89%8D%E7%AB%AF/shopAdmin/node_modules/.pnpm/unplugin-vue-components@0.22.12_vue@3.2.45/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import Inspect from "file:///F:/%E5%89%8D%E7%AB%AF/shopAdmin/node_modules/.pnpm/vite-plugin-inspect@0.7.40_vite@4.0.4/node_modules/vite-plugin-inspect/dist/index.mjs";
var __vite_injected_original_dirname = "F:\\\u524D\u7AEF\\shopAdmin";
var vite_config_default = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  console.log("\u8FD9\u662F", VITE_APP_ENV == "development" ? "\u5F00\u53D1" : "\u7EBF\u4E0A", "\u73AF\u5883");
  return {
    resolve: {
      alias: {
        // 设置别名
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
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
        algorithm: "gzip",
        ext: ".gz"
      }),
      AutoImport({
        imports: ["vue", "vue-router", "vue-i18n", "pinia", "@vueuse/core"],
        // 自动导入vue和vue-router相关函数
        dts: "src/auto-import.d.ts"
        // 生成 `auto-import.d.ts` 全局声明
      }),
      Components({
        resolvers: [
          NaiveUiResolver(),
          IconsResolver({ componentPrefix: "icon" }),
          VueUseComponentsResolver()
        ]
      }),
      Icons({
        compiler: "vue3",
        autoInstall: true
      }),
      Inspect({})
    ],
    server: {
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "http://ceshi13.dishait.cn",
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    },
    build: {
      minify: "terser",
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2e3,
      // 在生产环境移除console.log
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: false,
          pure_funcs: ["console.log", "console.info"],
          drop_debugger: true
        }
      },
      assetsDir: "static/assets",
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks: {
            vue: ["vue", "vue-router", "pinia", "@vueuse/core", "vue-i18n"]
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/assets/styles/variables.scss";
        `,
          javascriptEnabled: true
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxcdTUyNERcdTdBRUZcXFxcc2hvcEFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxcdTUyNERcdTdBRUZcXFxcc2hvcEFkbWluXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi8lRTUlODklOEQlRTclQUIlQUYvc2hvcEFkbWluL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJztcbmltcG9ydCBXaW5kaUNTUyBmcm9tICd2aXRlLXBsdWdpbi13aW5kaWNzcyc7XG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nO1xuaW1wb3J0IFZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnO1xuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xuaW1wb3J0IHsgVnVlVXNlQ29tcG9uZW50c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcbmltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlLCBjb21tYW5kIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcbiAgY29uc3QgeyBWSVRFX0FQUF9FTlYgfSA9IGVudjtcbiAgY29uc29sZS5sb2coXCJcdThGRDlcdTY2MkZcIiwgVklURV9BUFBfRU5WID09IFwiZGV2ZWxvcG1lbnRcIiA/IFwiXHU1RjAwXHU1M0QxXCIgOiBcIlx1N0VCRlx1NEUwQVwiLCBcIlx1NzNBRlx1NTg4M1wiKTtcbiAgcmV0dXJuIHtcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAvLyBcdThCQkVcdTdGNkVcdTUyMkJcdTU0MERcbiAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgdnVlSnN4KCksXG4gICAgICBXaW5kaUNTUygpLFxuICAgICAgVnVlU2V0dXBFeHRlbmQoKSxcbiAgICAgIHZpdGVDb21wcmVzc2lvbih7XG4gICAgICAgIHZlcmJvc2U6IHRydWUsXG4gICAgICAgIGRpc2FibGU6IGZhbHNlLFxuICAgICAgICB0aHJlc2hvbGQ6IDEwMjQwLFxuICAgICAgICBhbGdvcml0aG06ICdnemlwJyxcbiAgICAgICAgZXh0OiAnLmd6JyxcbiAgICAgIH0pLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAndnVlLWkxOG4nLFwicGluaWFcIiwgJ0B2dWV1c2UvY29yZSddLCAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjV2dWVcdTU0OEN2dWUtcm91dGVyXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwXG4gICAgICAgIGR0czogXCJzcmMvYXV0by1pbXBvcnQuZC50c1wiIC8vIFx1NzUxRlx1NjIxMCBgYXV0by1pbXBvcnQuZC50c2AgXHU1MTY4XHU1QzQwXHU1OEYwXHU2NjBFXG4gICAgICB9KSxcbiAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgICBOYWl2ZVVpUmVzb2x2ZXIoKSxcbiAgICAgICAgICBJY29uc1Jlc29sdmVyKHtjb21wb25lbnRQcmVmaXg6ICdpY29uJyB9KSxcbiAgICAgICAgICBWdWVVc2VDb21wb25lbnRzUmVzb2x2ZXIoKVxuICAgICAgICBdXG4gICAgICB9KSxcbiAgICAgIEljb25zKHtcbiAgICAgICAgY29tcGlsZXI6ICd2dWUzJyxcbiAgICAgICAgYXV0b0luc3RhbGw6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIEluc3BlY3Qoe30pXG4gICAgXSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy9hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2Nlc2hpMTMuZGlzaGFpdC5jbicsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgICBicm90bGlTaXplOiBmYWxzZSxcbiAgICAgIC8vIFx1NkQ4OFx1OTY2NFx1NjI1M1x1NTMwNVx1NTkyN1x1NUMwRlx1OEQ4NVx1OEZDNzUwMGtiXHU4QjY2XHU1NDRBXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gICAgICAvLyBcdTU3MjhcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTc5RkJcdTk2NjRjb25zb2xlLmxvZ1xuICAgICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgICBjb21wcmVzczoge1xuICAgICAgICAgIC8vXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU2NUY2XHU3OUZCXHU5NjY0Y29uc29sZVxuICAgICAgICAgIGRyb3BfY29uc29sZTogZmFsc2UsXG4gICAgICAgICAgcHVyZV9mdW5jczogWydjb25zb2xlLmxvZycsICdjb25zb2xlLmluZm8nXSxcbiAgICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFzc2V0c0RpcjogJ3N0YXRpYy9hc3NldHMnLFxuICAgICAgLy8gXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU2MjUzXHU1MzA1XHU1MjMwZGlzdFx1NEUwQlx1NzY4NFx1NEUwRFx1NTQwQ1x1NzZFRVx1NUY1NVxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ3N0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ3N0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ3N0YXRpYy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJyxcbiAgICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAgIHZ1ZTogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYScsICdAdnVldXNlL2NvcmUnLCAndnVlLWkxOG4nXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBcbiAgICAgICAgICBAaW1wb3J0IFwiQC9hc3NldHMvc3R5bGVzL3ZhcmlhYmxlcy5zY3NzXCI7XG4gICAgICAgIGAsXG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFQLE9BQU8sVUFBVTtBQUN0USxPQUFPLFNBQVM7QUFDaEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sY0FBYztBQUNyQixPQUFPLFlBQVk7QUFDbkIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxvQkFBb0I7QUFDM0IsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxnQ0FBZ0M7QUFDekMsT0FBTyxhQUFhO0FBYnBCLElBQU0sbUNBQW1DO0FBZXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsTUFBTSxRQUFRLE1BQU07QUFDakQsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUN2QyxRQUFNLEVBQUUsYUFBYSxJQUFJO0FBQ3pCLFVBQVEsSUFBSSxnQkFBTSxnQkFBZ0IsZ0JBQWdCLGlCQUFPLGdCQUFNLGNBQUk7QUFDbkUsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBO0FBQUEsUUFFTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDcEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxRQUNkLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxRQUNYLFdBQVc7QUFBQSxRQUNYLEtBQUs7QUFBQSxNQUNQLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNULFNBQVMsQ0FBQyxPQUFPLGNBQWMsWUFBVyxTQUFTLGNBQWM7QUFBQTtBQUFBLFFBQ2pFLEtBQUs7QUFBQTtBQUFBLE1BQ1AsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsV0FBVztBQUFBLFVBQ1QsZ0JBQWdCO0FBQUEsVUFDaEIsY0FBYyxFQUFDLGlCQUFpQixPQUFPLENBQUM7QUFBQSxVQUN4Qyx5QkFBeUI7QUFBQSxRQUMzQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsTUFBTTtBQUFBLFFBQ0osVUFBVTtBQUFBLFFBQ1YsYUFBYTtBQUFBLE1BQ2YsQ0FBQztBQUFBLE1BQ0QsUUFBUSxDQUFDLENBQUM7QUFBQSxJQUNaO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUM5QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixZQUFZO0FBQUE7QUFBQSxNQUVaLHVCQUF1QjtBQUFBO0FBQUEsTUFFdkIsZUFBZTtBQUFBLFFBQ2IsVUFBVTtBQUFBO0FBQUEsVUFFUixjQUFjO0FBQUEsVUFDZCxZQUFZLENBQUMsZUFBZSxjQUFjO0FBQUEsVUFDMUMsZUFBZTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUFBLE1BQ0EsV0FBVztBQUFBO0FBQUEsTUFFWCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixjQUFjO0FBQUEsWUFDWixLQUFLLENBQUMsT0FBTyxjQUFjLFNBQVMsZ0JBQWdCLFVBQVU7QUFBQSxVQUNoRTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osZ0JBQWdCO0FBQUE7QUFBQTtBQUFBLFVBR2hCLG1CQUFtQjtBQUFBLFFBQ3JCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
