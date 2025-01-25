// vite.es.config.ts
import { defineConfig } from "file:///D:/Codes/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/18-elemetplus-clone/hangUI/node_modules/.pnpm/vite@5.4.13_@types+node@20.17.14/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Codes/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/18-elemetplus-clone/hangUI/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@5.4.13_vue@3.5.13/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///D:/Codes/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/18-elemetplus-clone/hangUI/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.17.14_typescript@5.6.3_vite@5.4.13/node_modules/vite-plugin-dts/dist/index.mjs";
import { readdirSync } from "fs";
import { resolve } from "path";
import { filter, map, includes } from "file:///D:/Codes/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/18-elemetplus-clone/hangUI/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
var __vite_injected_original_dirname = "D:\\Codes\\\u524D\u7AEF\u5B66\u4E60\\18-elemetplus-clone\\hangUI\\packages\\core";
function getDirectoriesSync(basePath) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
var vite_es_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types"
    })
  ],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      name: "hangui",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        // TODO:这里的name属性是否合乎vite（v5.1.4）的使用？
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name;
        },
        manualChunks(id) {
          if (includes(id, "node_modules")) return "vendor";
          if (includes(id, "/packages/hooks")) return "hooks";
          if (includes(id, "/packages/utils") || includes(id, "plugin-vue:export-helper"))
            return "utils";
          for (const item of getDirectoriesSync("../components")) {
            if (includes(id, `/packages/components/${item}`)) {
              return item;
            }
          }
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2Rlc1xcXFxcdTUyNERcdTdBRUZcdTVCNjZcdTRFNjBcXFxcMTgtZWxlbWV0cGx1cy1jbG9uZVxcXFxoYW5nVUlcXFxccGFja2FnZXNcXFxcY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcQ29kZXNcXFxcXHU1MjREXHU3QUVGXHU1QjY2XHU0RTYwXFxcXDE4LWVsZW1ldHBsdXMtY2xvbmVcXFxcaGFuZ1VJXFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcdml0ZS5lcy5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0NvZGVzLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVBRCVBNiVFNCVCOSVBMC8xOC1lbGVtZXRwbHVzLWNsb25lL2hhbmdVSS9wYWNrYWdlcy9jb3JlL3ZpdGUuZXMuY29uZmlnLnRzXCI7Ly9cdThGRDlcdTkxQ0NcdTY2MkZcdTRGN0ZcdTc1Mjh2aXRlXHU1QkY5XHU5ODc5XHU3NkVFXHU4RkRCXHU4ODRDRVNcdTVGNjJcdTVGMEZcdTc2ODRcdTYyNTNcdTUzMDVcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xyXG5pbXBvcnQgeyByZWFkZGlyU3luYywgcmVhZGRpciB9IGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZGVmZXIsIGRlbGF5LCBmaWx0ZXIsIG1hcCwgaW5jbHVkZXMgfSBmcm9tIFwibG9kYXNoLWVzXCI7XHJcbmZ1bmN0aW9uIGdldERpcmVjdG9yaWVzU3luYyhiYXNlUGF0aDogc3RyaW5nKSB7XHJcbiAgY29uc3QgZW50cmllcyA9IHJlYWRkaXJTeW5jKGJhc2VQYXRoLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSk7XHJcblxyXG4gIHJldHVybiBtYXAoXHJcbiAgICBmaWx0ZXIoZW50cmllcywgKGVudHJ5KSA9PiBlbnRyeS5pc0RpcmVjdG9yeSgpKSxcclxuICAgIChlbnRyeSkgPT4gZW50cnkubmFtZVxyXG4gICk7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIGR0cyh7XHJcbiAgICAgIHRzY29uZmlnUGF0aDogXCIuLi8uLi90c2NvbmZpZy5idWlsZC5qc29uXCIsXHJcbiAgICAgIG91dERpcjogXCJkaXN0L3R5cGVzXCIsXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6IFwiZGlzdC9lc1wiLFxyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL2luZGV4LnRzXCIpLFxyXG4gICAgICBuYW1lOiBcImhhbmd1aVwiLFxyXG4gICAgICBmaWxlTmFtZTogXCJpbmRleFwiLFxyXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiXSxcclxuICAgIH0sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGV4dGVybmFsOiBbXHJcbiAgICAgICAgXCJ2dWVcIixcclxuICAgICAgICBcIkBmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZVwiLFxyXG4gICAgICAgIFwiQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zXCIsXHJcbiAgICAgICAgXCJAZm9ydGF3ZXNvbWUvdnVlLWZvbnRhd2Vzb21lXCIsXHJcbiAgICAgICAgXCJAcG9wcGVyanMvY29yZVwiLFxyXG4gICAgICAgIFwiYXN5bmMtdmFsaWRhdG9yXCIsXHJcbiAgICAgIF0sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIC8vIFRPRE86XHU4RkQ5XHU5MUNDXHU3Njg0bmFtZVx1NUM1RVx1NjAyN1x1NjYyRlx1NTQyNlx1NTQwOFx1NEU0RXZpdGVcdUZGMDh2NS4xLjRcdUZGMDlcdTc2ODRcdTRGN0ZcdTc1MjhcdUZGMUZcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xyXG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lID09PSBcInN0eWxlLmNzc1wiKSByZXR1cm4gXCJpbmRleC5jc3NcIjtcclxuICAgICAgICAgIHJldHVybiBhc3NldEluZm8ubmFtZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgIGlmIChpbmNsdWRlcyhpZCwgXCJub2RlX21vZHVsZXNcIikpIHJldHVybiBcInZlbmRvclwiO1xyXG5cclxuICAgICAgICAgIGlmIChpbmNsdWRlcyhpZCwgXCIvcGFja2FnZXMvaG9va3NcIikpIHJldHVybiBcImhvb2tzXCI7XHJcblxyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBpbmNsdWRlcyhpZCwgXCIvcGFja2FnZXMvdXRpbHNcIikgfHxcclxuICAgICAgICAgICAgaW5jbHVkZXMoaWQsIFwicGx1Z2luLXZ1ZTpleHBvcnQtaGVscGVyXCIpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICAgIHJldHVybiBcInV0aWxzXCI7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZ2V0RGlyZWN0b3JpZXNTeW5jKFwiLi4vY29tcG9uZW50c1wiKSkge1xyXG4gICAgICAgICAgICBpZiAoaW5jbHVkZXMoaWQsIGAvcGFja2FnZXMvY29tcG9uZW50cy8ke2l0ZW19YCkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUztBQUNoQixTQUFTLG1CQUE0QjtBQUNyQyxTQUFTLGVBQWU7QUFDeEIsU0FBdUIsUUFBUSxLQUFLLGdCQUFnQjtBQU5wRCxJQUFNLG1DQUFtQztBQU96QyxTQUFTLG1CQUFtQixVQUFrQjtBQUM1QyxRQUFNLFVBQVUsWUFBWSxVQUFVLEVBQUUsZUFBZSxLQUFLLENBQUM7QUFFN0QsU0FBTztBQUFBLElBQ0wsT0FBTyxTQUFTLENBQUMsVUFBVSxNQUFNLFlBQVksQ0FBQztBQUFBLElBQzlDLENBQUMsVUFBVSxNQUFNO0FBQUEsRUFDbkI7QUFDRjtBQUNBLElBQU8seUJBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxNQUNGLGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ3RDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUE7QUFBQSxRQUVOLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxVQUFVLFNBQVMsWUFBYSxRQUFPO0FBQzNDLGlCQUFPLFVBQVU7QUFBQSxRQUNuQjtBQUFBLFFBQ0EsYUFBYSxJQUFJO0FBQ2YsY0FBSSxTQUFTLElBQUksY0FBYyxFQUFHLFFBQU87QUFFekMsY0FBSSxTQUFTLElBQUksaUJBQWlCLEVBQUcsUUFBTztBQUU1QyxjQUNFLFNBQVMsSUFBSSxpQkFBaUIsS0FDOUIsU0FBUyxJQUFJLDBCQUEwQjtBQUV2QyxtQkFBTztBQUNULHFCQUFXLFFBQVEsbUJBQW1CLGVBQWUsR0FBRztBQUN0RCxnQkFBSSxTQUFTLElBQUksd0JBQXdCLElBQUksRUFBRSxHQUFHO0FBQ2hELHFCQUFPO0FBQUEsWUFDVDtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
