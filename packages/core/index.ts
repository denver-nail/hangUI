import { makeInstaller } from "@hangui/utils";
import components from "./components";
//导入样式文件
import "@hangui/theme/index.css";
//通过返回的 installer，可以将整个插件集合作为一个插件进行统一安装。
const installer = makeInstaller(components);
//core作为所有组件暴露的出口
export * from "@hangui/components";
export default installer;
