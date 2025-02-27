import { isFunction } from "lodash-es";
import { getCurrentInstance, ref, type Ref } from "vue";
import useEventListener from "./useEventListener";

interface UseFocusControllerOptions {
  /**
   * 焦点获取后的回调函数
   * @remarks 在元素获得焦点后触发，适用于需要焦点后处理场景
   */
  afterFocus?(): void;
  /**
   * 焦点失去前的拦截函数
   * @param event - 焦点事件对象
   * @returns 返回 false 可阻止失去焦点
   * @remarks 常用于表单验证等需要阻止失焦的场景
   */
  beforeBlur?(event: FocusEvent): boolean | void;
  /**
   * 焦点失去后的回调函数
   * @remarks 在元素完全失去焦点后触发，适用于失焦后的清理操作
   */
  afterBlur?(): void;
}
function useFocusController<T extends HTMLElement | { focus(): void }>(
  target: Ref<T | void>, // 需要控制焦点的目标元素引用
  { afterFocus, beforeBlur, afterBlur }: UseFocusControllerOptions
) {
  // 组件实例相关
  const instance = getCurrentInstance()!;
  const { emit } = instance; // 获取组件 emit 方法用于触发事件
  // 响应式状态
  const wrapperRef = ref<HTMLElement>(); // 包裹层 DOM 引用（用于点击聚焦）
  const isFocused = ref(false); // 焦点状态标记
  /** 处理焦点获取事件 */
  const handleFocus = (event: FocusEvent) => {
    if (isFocused.value) return; // 避免重复触发
    isFocused.value = true;
    emit("focus", event); // 触发组件 focus 事件
    afterFocus?.(); // 执行自定义后置回调
  };
  /** 处理焦点失去事件 */
  const handleBlur = (event: FocusEvent) => {
    // 执行前置拦截检查（例如表单验证）
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;

    // 满足以下条件时不更新焦点状态：
    // 1. 拦截函数返回真值
    // 2. 焦点转移到包裹层内部元素
    if (
      cancelBlur ||
      (event.relatedTarget &&
        wrapperRef.value?.contains(event.relatedTarget as Node))
    )
      return;

    isFocused.value = false;

    emit("blur", event); // 触发组件 blur 事件
    afterBlur?.(); // 执行自定义后置回调
  };
  /** 点击包裹层触发目标元素聚焦 */
  const handleClick = () => {
    target.value?.focus(); // 代理聚焦到实际输入元素
  };
  // 绑定包裹层点击事件监听
  useEventListener(wrapperRef, "click", handleClick);
  return {
    wrapperRef, // 需要绑定到包裹层 DOM 的引用
    isFocused, // 当前焦点状态 (可用于样式控制)
    handleFocus, // 需绑定到目标元素的 focus 事件
    handleBlur, // 需绑定到目标元素的 blur 事件
  };
}
export default useFocusController;
