import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
//导入编写的UI库
import HangUI from "hangui";
//使用use将组件以插件的方式添加到应用上
createApp(App).use(HangUI).mount("#app");
