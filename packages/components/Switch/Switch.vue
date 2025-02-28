<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
// import { debugWarn } from "@hangui/utils";
import { useId } from "@hangui/hooks";
import type { SwitchEmits, SwitchProps, SwitchInstance } from "./types";
defineOptions({
  name: "HSwitch",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();
const isDisabled = computed(() => {
  return props.disabled;
});
const innerValue = ref(props.modelValue);
const inputRef = ref<HTMLInputElement | null>(null);
const checked = computed(() => innerValue.value === props.activeValue);
const inputId = useId().value;
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
  //TODO:form校验逻辑
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
