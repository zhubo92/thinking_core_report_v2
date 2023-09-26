import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/

const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

const alias: Record<string, string> = {
  "@": pathResolve("src"),
};
export default defineConfig({
  plugins: [vue()],
  base: "./",
  css: {
    preprocessorOptions: {
      scss: {
        /**
         * 单行溢出隐藏 @include single-hide();
         *
         * 多行溢出隐藏 @include multi-hide(3);
         *
         * flex布局垂直水平居中 @include flex-center();
         *
         */
        additionalData: `
          @mixin flex-center() {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          @mixin single-hide() {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          @mixin multi-hide($num) {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: $num;
          }
        `,
      },
    },
  },
  server: {
    host: true,
    port: 8989,
    proxy: {
      "/zd-api": {
        // target: "https://open.api.luojigou.vip",
        target: "https://open.test.luojigou.vip",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/zd-api/, ""),
      },
    },
  },
  resolve: {
    alias,
    // 使用路径别名时想要省略的后缀名，可以自己 增减
    extensions: [".js", ".json", ".ts", ".vue"],
  },
});
