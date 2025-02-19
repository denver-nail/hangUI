import {
  onMounted,
  onBeforeUnmount,
  watch,
  isRef,
  unref,
  type MaybeRef,
} from "vue";

/**
 * 自定义 Hook：用于在 Vue 组件中方便地添加和移除事件监听器
 * @param target - 目标元素，可以是一个 Ref 或普通的 EventTarget/HTMLElement
 * @param event - 要监听的事件名称（如 "click"、"mouseenter" 等）
 * @param handler - 事件处理函数
 */
export default function useEventListener(
  target: MaybeRef<EventTarget | HTMLElement | void>, // 目标元素，支持 Ref 或普通值
  event: string, // 事件名称
  handler: (e: Event) => any // 事件处理函数
) {
  // 如果 target 是一个 Ref
  if (isRef(target)) {
    // 监听 target 的变化
    watch(target, (val, oldVal) => {
      // 移除旧值上的事件监听器
      oldVal?.removeEventListener(event, handler);
      // 添加新值上的事件监听器
      val?.addEventListener(event, handler);
    });
  } else {
    // 如果 target 不是 Ref，则在组件挂载时添加事件监听器
    onMounted(() => target?.addEventListener(event, handler));
  }

  // 在组件卸载前移除事件监听器
  onBeforeUnmount(() => unref(target)?.removeEventListener(event, handler));
}
