//这里是使用vite对项目进行ES形式的打包
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { readdirSync } from "fs";
import { resolve } from "path";
import { delay, filter, map, includes } from "lodash-es";
import shell from "shelljs";
import hooks from "./hooksPlugins";
import terser from "@rollup/plugin-terser";
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";
//自己编写的在打包好后移动theme文件夹的函数
const TRY_MOVE_STYLES_DELAY = 800 as const;
function moveStyle() {
  try {
    //读文件的作用是保证打包完成后再移动文件
    readdirSync("./dist/es/theme");
    shell.mv("./dist/es/theme", "./dist/");
  } catch (_) {
    delay(moveStyle, TRY_MOVE_STYLES_DELAY);
  }
}
//同步获取指定目录下的所有子目录的名称。
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
    hooks({
      rmfiles: ["./dist/es", "./dist/theme", "./dist/types"],
      afterBuild: moveStyle,
    }),

    terser({
      //配置压缩
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        //条件编译
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
      //配置格式化相关
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      //配置混淆
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
  ],
  build: {
    outDir: "dist/es",
    minify: false, //关闭默认混淆
    // css样式是否分包
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "hangui",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        // TODO:这里的name属性是否合乎vite（v5.1.4）的使用？
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          if (
            assetInfo.type === "asset" &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return "theme/[name].[ext]";
          }
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (includes(id, "node_modules")) return "vendor";

          if (includes(id, "/packages/hooks")) return "hooks";

          if (
            includes(id, "/packages/utils") ||
            includes(id, "plugin-vue:export-helper")
          )
            return "utils";
          for (const item of getDirectoriesSync("../components")) {
            if (includes(id, `/packages/components/${item}`)) {
              return item;
            }
          }
        },
      },
    },
  },
});
