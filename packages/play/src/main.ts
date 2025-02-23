import { createApp } from "vue";
import App from "./App.vue";
//导入编写的UI库
import HangUI, { zhCn } from "@purple-liu/hangui";
//导入组件库的样式
import "@purple-liu/hangui/dist/index.css";

//使用use将组件以插件的方式添加到应用上
createApp(App).use(HangUI, { locale: zhCn }).mount("#app");
