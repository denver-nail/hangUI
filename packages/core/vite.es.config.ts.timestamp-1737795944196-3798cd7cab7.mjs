// vite.es.config.ts
import { defineConfig } from "file:///D:/Codes/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/18-elemetplus-clone/hangUI/node_modules/.pnpm/vite@5.4.13_@types+node@20.17.14/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Codes/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/18-elemetplus-clone/hangUI/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@5.4.13_vue@3.5.13/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///D:/Codes/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/18-elemetplus-clone/hangUI/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.17.14_typescript@5.6.3_vite@5.4.13/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
import { includes } from "file:///D:/Codes/%E5%89%8D%E7%AB%AF%E5%AD%A6%E4%B9%A0/18-elemetplus-clone/hangUI/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
var __vite_injected_original_dirname = "D:\\Codes\\\u524D\u7AEF\u5B66\u4E60\\18-elemetplus-clone\\hangUI\\packages\\core";
var COMP_NAMES = [
  "Button",
  "Icon",
  "Alert",
  "Collapse",
  "Dropdown",
  "Form",
  "Input",
  "Loading",
  "Message",
  "MessageBox",
  "Overlay",
  "Popconfirm",
  "Select",
  "Switch",
  "Tooltip",
  "Upload"
];
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
          if (includes(id, "/packages/utils")) return "utils";
          for (const item of COMP_NAMES) {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDb2Rlc1xcXFxcdTUyNERcdTdBRUZcdTVCNjZcdTRFNjBcXFxcMTgtZWxlbWV0cGx1cy1jbG9uZVxcXFxoYW5nVUlcXFxccGFja2FnZXNcXFxcY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcQ29kZXNcXFxcXHU1MjREXHU3QUVGXHU1QjY2XHU0RTYwXFxcXDE4LWVsZW1ldHBsdXMtY2xvbmVcXFxcaGFuZ1VJXFxcXHBhY2thZ2VzXFxcXGNvcmVcXFxcdml0ZS5lcy5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0NvZGVzLyVFNSU4OSU4RCVFNyVBQiVBRiVFNSVBRCVBNiVFNCVCOSVBMC8xOC1lbGVtZXRwbHVzLWNsb25lL2hhbmdVSS9wYWNrYWdlcy9jb3JlL3ZpdGUuZXMuY29uZmlnLnRzXCI7Ly9cdThGRDlcdTkxQ0NcdTY2MkZcdTRGN0ZcdTc1Mjh2aXRlXHU1QkY5XHU5ODc5XHU3NkVFXHU4RkRCXHU4ODRDRVNcdTVGNjJcdTVGMEZcdTc2ODRcdTYyNTNcdTUzMDVcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCBkdHMgZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgaW5jbHVkZXMgfSBmcm9tIFwibG9kYXNoLWVzXCI7XHJcbmNvbnN0IENPTVBfTkFNRVMgPSBbXHJcbiAgXCJCdXR0b25cIixcclxuICBcIkljb25cIixcclxuICBcIkFsZXJ0XCIsXHJcbiAgXCJDb2xsYXBzZVwiLFxyXG4gIFwiRHJvcGRvd25cIixcclxuICBcIkZvcm1cIixcclxuICBcIklucHV0XCIsXHJcbiAgXCJMb2FkaW5nXCIsXHJcbiAgXCJNZXNzYWdlXCIsXHJcbiAgXCJNZXNzYWdlQm94XCIsXHJcbiAgXCJPdmVybGF5XCIsXHJcbiAgXCJQb3Bjb25maXJtXCIsXHJcbiAgXCJTZWxlY3RcIixcclxuICBcIlN3aXRjaFwiLFxyXG4gIFwiVG9vbHRpcFwiLFxyXG4gIFwiVXBsb2FkXCIsXHJcbl0gYXMgY29uc3Q7XHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICBkdHMoe1xyXG4gICAgICB0c2NvbmZpZ1BhdGg6IFwiLi4vLi4vdHNjb25maWcuYnVpbGQuanNvblwiLFxyXG4gICAgICBvdXREaXI6IFwiZGlzdC90eXBlc1wiLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiBcImRpc3QvZXNcIixcclxuICAgIGxpYjoge1xyXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9pbmRleC50c1wiKSxcclxuICAgICAgbmFtZTogXCJoYW5ndWlcIixcclxuICAgICAgZmlsZU5hbWU6IFwiaW5kZXhcIixcclxuICAgICAgZm9ybWF0czogW1wiZXNcIl0sXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogW1xyXG4gICAgICAgIFwidnVlXCIsXHJcbiAgICAgICAgXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmVcIixcclxuICAgICAgICBcIkBmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29uc1wiLFxyXG4gICAgICAgIFwiQGZvcnRhd2Vzb21lL3Z1ZS1mb250YXdlc29tZVwiLFxyXG4gICAgICAgIFwiQHBvcHBlcmpzL2NvcmVcIixcclxuICAgICAgICBcImFzeW5jLXZhbGlkYXRvclwiLFxyXG4gICAgICBdLFxyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAvLyBUT0RPOlx1OEZEOVx1OTFDQ1x1NzY4NG5hbWVcdTVDNUVcdTYwMjdcdTY2MkZcdTU0MjZcdTU0MDhcdTRFNEV2aXRlXHVGRjA4djUuMS40XHVGRjA5XHU3Njg0XHU0RjdGXHU3NTI4XHVGRjFGXHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChhc3NldEluZm8pID0+IHtcclxuICAgICAgICAgIGlmIChhc3NldEluZm8ubmFtZSA9PT0gXCJzdHlsZS5jc3NcIikgcmV0dXJuIFwiaW5kZXguY3NzXCI7XHJcbiAgICAgICAgICByZXR1cm4gYXNzZXRJbmZvLm5hbWUgYXMgc3RyaW5nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgICAgICBpZiAoaW5jbHVkZXMoaWQsIFwibm9kZV9tb2R1bGVzXCIpKSByZXR1cm4gXCJ2ZW5kb3JcIjtcclxuXHJcbiAgICAgICAgICBpZiAoaW5jbHVkZXMoaWQsIFwiL3BhY2thZ2VzL2hvb2tzXCIpKSByZXR1cm4gXCJob29rc1wiO1xyXG5cclxuICAgICAgICAgIGlmIChpbmNsdWRlcyhpZCwgXCIvcGFja2FnZXMvdXRpbHNcIikpIHJldHVybiBcInV0aWxzXCI7XHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgQ09NUF9OQU1FUykge1xyXG4gICAgICAgICAgICBpZiAoaW5jbHVkZXMoaWQsIGAvcGFja2FnZXMvY29tcG9uZW50cy8ke2l0ZW19YCkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFDeEIsU0FBUyxnQkFBZ0I7QUFMekIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxhQUFhO0FBQUEsRUFDakI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUNBLElBQU8seUJBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxNQUNGLGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsTUFDSCxPQUFPLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ3RDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDaEI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUE7QUFBQSxRQUVOLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxVQUFVLFNBQVMsWUFBYSxRQUFPO0FBQzNDLGlCQUFPLFVBQVU7QUFBQSxRQUNuQjtBQUFBLFFBQ0EsYUFBYSxJQUFJO0FBQ2YsY0FBSSxTQUFTLElBQUksY0FBYyxFQUFHLFFBQU87QUFFekMsY0FBSSxTQUFTLElBQUksaUJBQWlCLEVBQUcsUUFBTztBQUU1QyxjQUFJLFNBQVMsSUFBSSxpQkFBaUIsRUFBRyxRQUFPO0FBQzVDLHFCQUFXLFFBQVEsWUFBWTtBQUM3QixnQkFBSSxTQUFTLElBQUksd0JBQXdCLElBQUksRUFBRSxHQUFHO0FBQ2hELHFCQUFPO0FBQUEsWUFDVDtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
