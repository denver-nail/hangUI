<script setup lang="ts">
import { computed, type Ref } from "vue";
import type { LoadingOptions } from "./types";
import { isString } from "lodash-es";
import HIcon from "../Icon/Icon.vue";
defineOptions({
  name: "HLoading",
  inheritAttrs: false,
});
const props = defineProps<LoadingOptions>();
const iconName = computed(() => {
  if (isString(props.spinner)) {
    return props.spinner;
  }
  return "spinner";
});
</script>

<template>
  <transition name="fade-in-linear" @after-leave="onAfterLeave">
    <div
      v-show="(props.visible as Ref).value"
      class="er-loading er-loading__mask"
      :class="{ 'is-fullscreen': fullscreen }"
    >
      <div class="er-loading__spinner">
        <h-icon v-if="props.spinner !== false" :icon="iconName" spin />
        <p v-if="text" class="er-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>
<!-- 这里的样式涉及到全局滚动条隐藏以及其他全局相关的样式就没有做样式隔离 -->
<style>
@import "./style.css";
/* 使用了vue3新特性 */
.er-loading {
  /* 使用Vue3的v-bind绑定背景颜色，!important确保优先级 */
  --er-loading-bg-color: v-bind(background) !important;
  /* 使用Vue3的v-bind绑定z-index层级，!important确保优先级 */
  --er-loading-z-index: v-bind(zIndex) !important;
}
</style>
