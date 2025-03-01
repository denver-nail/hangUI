<script setup lang="ts">
import { computed, nextTick, ref, shallowRef, useAttrs, watch } from "vue";
import type { InputEmits, InputInstance, InputProps } from "./types";
import { useFocusController } from "@hangui/hooks";
import HIcon from "../Icon/Icon.vue";
import { each, noop } from "lodash-es";
import { useFormDisabled, useFormItem, useFormItemInputId } from "../Form";
import { debugWarn } from "@hangui/utils";
defineOptions({
  name: "HInput",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
});
const emits = defineEmits<InputEmits>();
const attrs = useAttrs;
const innerValue = ref(props.modelValue);
const pwdVisible = ref(false);
const inputRef = shallowRef<HTMLInputElement>();
const textareaRef = shallowRef<HTMLTextAreaElement>();
const _ref = computed(() => inputRef.value || textareaRef.value);
//使用Form组件提供的钩子获取表单项的上下文（input在表单中使用时将被表单项组件包裹）
const { formItem } = useFormItem();
//这里的disabled还收表单组件的控制，后续使用依赖注入来实现，表单组件控制disabled
const isDisabled = useFormDisabled();
const { inputId } = useFormItemInputId(props, formItem);
//清空按钮显示控制

const showClear = computed(
  () =>
    props.clearable &&
    !!innerValue.value &&
    !isDisabled.value &&
    isFocused.value
);
//密码可见的小图标显示控制
const showPwdArea = computed(() => {
  return (
    props.type === "password" &&
    !isDisabled.value &&
    props.showPassword &&
    !!innerValue.value
  );
});
const { wrapperRef, isFocused, handleBlur, handleFocus } = useFocusController(
  _ref,
  {
    afterBlur() {
      //表单校验
      formItem?.validate("blur").catch((err) => debugWarn(err));
    },
  }
);
const clear: InputInstance["clear"] = function () {
  innerValue.value = "";
  each(["input", "change", "update:modelValue"], (event) =>
    emits(event as any, "")
  );
  emits("clear");
  //清空表单校验
  formItem?.clearValidate();
};
const focus: InputInstance["focus"] = async function () {
  await nextTick();
  _ref.value?.focus();
};
const blur: InputInstance["blur"] = function () {
  _ref.value?.blur();
};
const select: InputInstance["select"] = function () {
  _ref.value?.select();
};
function handleInput() {
  emits("input", innerValue.value);
  emits("update:modelValue", innerValue.value);
}
function handleChange() {
  emits("change", innerValue.value);
}
function togglePasswordVisible() {
  pwdVisible.value = !pwdVisible.value;
}
watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal;
    //表单校验
    formItem?.validate("change").catch((err) => debugWarn(err));
  }
);
defineExpose<InputInstance>({
  ref: _ref,
  clear,
  focus,
  blur,
  select,
});
</script>
<template>
  <div
    class="er-input"
    :class="{
      [`er-input--${type}`]: type,
      [`er-input--${size}`]: size,
      'is-disabled': isDisabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      //   'is-focus': isFocused,
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <div v-if="$slots.prepend" class="er-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="er-input__wrapper" ref="wrapperRef">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="er-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          class="er-input__inner"
          ref="inputRef"
          :type="showPassword ? (pwdVisible ? 'text' : 'password') : type"
          :disabled="isDisabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          :id="inputId"
          v-model="innerValue"
          v-bind="attrs"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPwdArea"
          class="er-input__suffix"
        >
          <slot name="suffix"></slot>
          <h-icon
            icon="circle-xmark"
            v-if="showClear"
            class="er-input__clear"
            @click="clear"
            @mousedown.prevent="noop"
          />
          <h-icon
            icon="eye"
            v-if="showPwdArea && pwdVisible"
            class="er-input__password"
            @click="togglePasswordVisible"
          />
          <h-icon
            icon="eye-slash"
            v-if="showPwdArea && !pwdVisible"
            class="er-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="er-input__append">
        <slot name="append"></slot>
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        class="er-textarea__wrapper"
        ref="textareaRef"
        :disabled="isDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        :id="inputId"
        v-model="innerValue"
        v-bind="attrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
    </template>
  </div>
</template>
<style scoped>
@import "style.css";
</style>
