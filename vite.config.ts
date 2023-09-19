import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";

// https://vitejs.dev/config/

const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

const alias: Record<string, string> = {
  "@": pathResolve("src"),
};
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 9898,
    proxy: {
      "/zd-api": {
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
