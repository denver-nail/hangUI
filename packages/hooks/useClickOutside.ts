import { type Ref } from "vue";
import useEventListener from "./useEventListener";

// 监听点击外部区域的事件
export default function useClickOutside(
  // 需要监听的元素引用
  elementRef: Ref<HTMLElement | void>,
  // 点击外部区域时的回调函数
  callback: (e: MouseEvent) => void
) {
  // 使用useEventListener在document上监听click事件
  useEventListener(document, "click", (e: Event) => {
    // 如果元素存在且事件目标存在
    if (elementRef.value && e.target) {
      // 如果点击的目标不在元素内部
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        // 执行回调函数
        callback(e as MouseEvent);
      }
    }
  });
}
