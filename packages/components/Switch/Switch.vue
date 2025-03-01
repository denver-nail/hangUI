<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import type { SwitchEmits, SwitchProps, SwitchInstance } from "./types";
import { useFormDisabled, useFormItem, useFormItemInputId } from "../Form";
import { debugWarn } from "@hangui/utils";
defineOptions({
  name: "HSwitch",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();
const isDisabled = useFormDisabled();
const innerValue = ref(props.modelValue);
const inputRef = ref<HTMLInputElement | null>(null);
const checked = computed(() => innerValue.value === props.activeValue);
const { formItem } = useFormItem();
const { inputId } = useFormItemInputId(props, formItem);

//切换状态的回调
function handleChange() {
  if (isDisabled.value) return;

  const newVal = checked.value ? props.inactiveValue : props.activeValue;

  innerValue.value = newVal;
  emits("update:modelValue", newVal);
  emits("change", newVal);
}
onMounted(() => {
  inputRef.value!.checked = checked.value;
});
watch(checked, (val) => {
  // 同步更新input元素的checked状态
  inputRef.value!.checked = val;
  //form校验逻辑
  formItem?.validate("change").catch((err) => debugWarn(err));
});
watch(
  () => props.modelValue,
  (val) => (innerValue.value = val)
);
const focus: SwitchInstance["focus"] = function () {
  inputRef.value?.focus();
};

defineExpose<SwitchInstance>({
  focus,
  checked,
});
</script>
<template>
  <div
    class="er-switch"
    :class="{
      [`er-switch--${size}`]: size,
      'is-disabled': isDisabled,
      'is-checked': checked,
    }"
    @click="handleChange"
  >
    <!-- 这里的input是隐藏起来的，看不到的，这里的设计是根据input的状态来切换 div.er-switch__core的样式-->
    <input
      class="er-switch__input"
      type="checkbox"
      role="switch"
      ref="inputRef"
      :id="inputId"
      :name="name"
      :disabled="isDisabled"
      :checked="checked"
      @keydown.enter="handleChange"
      @blur="formItem?.validate('blur').catch((err) => debugWarn(err))"
    />
    <div class="er-switch__core">
      <div class="er-switch__core-inner">
        <span
          v-if="activeText || inactiveText"
          class="er-switch__core-inner-text"
        >
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="er-switch__core-action"></div>
    </div>
  </div>
</template>
<style scoped>
@import "./style.css";
</style>
