export { default as zhTw } from "./lang/zh-tw";
export { default as zhCn } from "./lang/zh-cn";
export { default as en } from "./lang/en";
export { default as ja } from "./lang/ja";
export { default as ko } from "./lang/ko";
// 上面分别对应中文繁体/中文简体/英文/日文/韩文
export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair;
};

export type Language = {
  name: string;
  el: TranslatePair;
};
