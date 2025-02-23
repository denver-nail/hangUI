import components from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
//导入样式文件
import "@hangui/theme/index.css";
//导入条件编译打印的logo
import printLogo from "./printLogo";
import { makeInstaller } from "./makeInstaller";
printLogo();
//配置图标库
library.add(fas);
//通过返回的 installer，可以将整个插件集合作为一个插件进行统一安装。
const installer = makeInstaller(components);
//core作为所有组件暴露的出口(使用@hangui形式在打包后类型是找不到的，使用相对路径)
export * from "@hangui/components";
export * from "@hangui/locale";
export default installer;
