<script setup lang="ts">
import type {
  FormProps,
  FormEmits,
  FormItemContext,
  FormContext,
  FormInstance,
} from "./types";
import { FORM_CTX_KEY } from "./constants.ts";
import { provide, reactive, toRefs } from "vue";
import type { ValidateFieldsError } from "async-validator";
import { each, filter, includes, size } from "lodash-es";
defineOptions({
  name: "HForm",
});
const props = withDefaults(defineProps<FormProps>(), {
  showMessage: true,
  hideRequiredAsterisk: false,
  requiredAsteriskPosition: "left",
  labelPosition: "right",
});
const emits = defineEmits<FormEmits>();
//存储所有表单项
const fields: FormItemContext[] = [];

async function doValidateField(fields: FormItemContext[] = []) {
  let validateErrors: ValidateFieldsError = {};
  for (const field of fields) {
    try {
      await field.validate("");
    } catch (error) {
      validateErrors = {
        ...validateErrors,
        ...(error as ValidateFieldsError),
      };
    }
  }
  if (!size(Object.keys(validateErrors))) return true;
  return Promise.reject(validateErrors);
}
const addField: FormContext["addField"] = function (field) {
  // 如果表单项没有prop属性，则不添加
  if (!field.prop) return;
  // 将表单项添加到fields数组中
  fields.push(field);
};

const removeField: FormContext["removeField"] = function (field) {
  // 如果表单项没有prop属性，则不移除
  if (!field.prop) return;
  // 找到表单项在fields数组中的索引并移除
  fields.splice(fields.indexOf(field), 1);
};
const validate: FormInstance["validate"] = async function (callback) {
  return validateField([], callback);
};
function filterFields(fields: FormItemContext[], keys: string[] = []) {
  // 如果keys数组有值，则过滤出prop属性在keys数组中的表单项
  return size(keys)
    ? filter(fields, (field) => includes(keys, field.prop))
    : // 如果keys数组为空，则返回所有表单项
      fields;
}

const validateField: FormInstance["validateField"] = async function (
  keys, // 要验证的表单项的prop属性数组
  callback // 验证完成后的回调函数
) {
  try {
    // 过滤出需要验证的表单项并进行验证
    const result = await doValidateField(filterFields(fields, keys));
    // 如果验证成功，调用回调函数
    if (result === true) {
      callback?.(result);
    }
    // 返回验证结果
    return result;
  } catch (error) {
    // 如果错误是Error实例，直接抛出
    if (error instanceof Error) throw error;
    // 将错误转换为ValidateFieldsError类型
    const invalidFields = error as ValidateFieldsError;
    // 调用回调函数，传递验证失败的结果和错误信息
    callback?.(false, invalidFields);
    // 返回拒绝的Promise
    return Promise.reject(invalidFields);
  }
};
const resetFields: FormInstance["resetFields"] = function (keys) {
  // 遍历过滤出的表单项，调用每个表单项的resetField方法进行重置
  each(filterFields(fields, keys), (field) => field.resetField());
};
const clearValidate: FormInstance["clearValidate"] = function (keys) {
  // 遍历过滤出的表单项，调用每个表单项的clearValidate方法清除验证状态
  each(filterFields(fields, keys), (field) => field.clearValidate());
};

// 提供的给子组件使用的上下文
const formCtx: FormContext = reactive({
  ...toRefs(props),
  emits,
  addField,
  removeField,
});
provide<FormContext>(FORM_CTX_KEY, formCtx);
defineExpose<FormInstance>({
  validate,
  validateField,
  resetFields,
  clearValidate,
});
</script>
<template>
  <form class="er-form">
    <slot></slot>
  </form>
</template>
<style scoped>
@import "style.css";
</style>
