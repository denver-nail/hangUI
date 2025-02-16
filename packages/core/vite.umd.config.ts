//这里是使用vite对项目进行UMD形式的打包
import { defineConfig } from "vite";
import { delay } from "lodash-es";
import { resolve } from "path";
import { readFileSync } from "fs";
import { compression } from "vite-plugin-compression2";

import hooks from "./hooksPlugins";
import shell from "shelljs";
import vue from "@vitejs/plugin-vue";
import terser from "@rollup/plugin-terser";
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";
//自己编写的在打包好后移动style.css文件的函数
const TRY_MOVE_STYLES_DELAY = 800 as const;
function moveStyle() {
  try {
    //读文件的作用是保证打包完成后再移动文件
    readFileSync("./dist/umd/index.css.gz");
    shell.cp("./dist//umd/index.css", "./dist/index.css");
  } catch (_) {
    delay(moveStyle, TRY_MOVE_STYLES_DELAY);
  }
}

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    hooks({
      rmfiles: ["./dist/umd/", "./dist/index.css"],
      afterBuild: moveStyle,
    }),
    terser({
      //配置压缩
      compress: {
        drop_console: ["log"],
        drop_debugger: true,
        passes: 3,
        //条件编译
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
    }),
  ],
  build: {
    outDir: "dist/umd",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "hangui",
      fileName: "index",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        // TODO:这里的name属性是否合乎vite（v5.1.4）的使用？
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
      },
    },
  },
});
