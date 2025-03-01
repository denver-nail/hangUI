import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constants";
import { useId, useProp } from "@hangui/hooks";
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  ref,
  toRef,
  unref,
  watch,
  type MaybeRef,
  type WatchStopHandle,
} from "vue";
import type { FormItemContext } from "./types";
// 使用该钩子将表单和表单项提供的上下文都获取到
export function useFormItem() {
  // 获取表单上下文
  const form = inject(FORM_CTX_KEY, void 0);
  // 获取表单项上下文
  const formItem = inject(FORM_ITEM_CTX_KEY, void 0);
  // 返回包含表单和表单项上下文的对象
  return { form, formItem };
}

export function useFormDisabled(fallback?: MaybeRef<boolean | void>) {
  // 获取当前组件的disabled prop
  const disabled = useProp<boolean>("disabled");
  // 获取表单上下文
  const form = inject(FORM_CTX_KEY, void 0);
  // 获取表单项上下文
  const formItem = inject(FORM_ITEM_CTX_KEY, void 0);
  // 返回一个计算属性，判断是否禁用
  return computed(
    () =>
      disabled.value || // 当前组件的disabled prop
      unref(fallback) || // 传入的fallback值
      form?.disabled || // 表单的disabled状态
      formItem?.disabled || // 表单项的disabled状态
      false // 默认值
  );
}

interface UseFormItemInputCommenProps extends Record<string, any> {
  id?: string; // 输入框的id属性
}

export function useFormItemInputId(
  props: UseFormItemInputCommenProps, // 输入框的props
  formItemContext?: FormItemContext // 表单项上下文（可选）
) {
  // 存储输入框的id
  const inputId = ref<string>("");
  // 用于存储watch的停止函数
  let unwatch: WatchStopHandle | void;

  onMounted(() => {
    // 监听props.id的变化
    unwatch = watch(
      toRef(() => props.id),
      (id) => {
        // 如果props.id存在则使用，否则生成一个新的id
        const newId = id ?? useId().value;
        // 如果id发生变化
        if (newId !== inputId.value) {
          // 移除旧的id
          inputId.value && formItemContext?.removeInputId(inputId.value);
          // 添加新的id
          formItemContext?.addInputId(newId);
          // 更新inputId
          inputId.value = newId;
        }
      },
      {
        immediate: true, // 立即执行
      }
    );
  });

  onUnmounted(() => {
    // 组件卸载时停止监听
    unwatch && unwatch();
    // 移除当前id
    inputId.value && formItemContext?.removeInputId(inputId.value);
  });
  // 返回inputId
  return {
    inputId,
  };
}
