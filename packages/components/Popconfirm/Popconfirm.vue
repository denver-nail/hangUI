<script setup lang="ts">
import type { PopconfirmProps, PopconfirmEmits } from "./types";
import type { TooltipInstance } from "../Tooltip";
import { computed, ref } from "vue";
import { addUnit } from "@hangui/utils";
import HButton from "../Button/Button.vue";
import HTooltip from "../Tooltip/Tooltip.vue";
import HIcon from "../Icon/Icon.vue";
import { useLocale } from "@hangui/hooks";
defineOptions({
  name: "HPopconfirm",
});
const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: "",
  confirmButtonType: "primary",
  icon: "question-circle",
  iconColor: "#f90",
  hideAfter: 200,
  width: 150,
});
const emits = defineEmits<PopconfirmEmits>();
const tooltipRef = ref<TooltipInstance>();
//给props中的width属性添加单位
const style = computed(() => ({ width: addUnit(props.width) }));
//隐藏气泡框
function hidePopper() {
  tooltipRef.value?.hide();
}
//确认按钮点击事件
function confirm(e: MouseEvent) {
  emits("confirm", e);
  hidePopper();
}

//取消按钮点击事件
function cancel(e: MouseEvent) {
  emits("cancel", e);
  hidePopper();
}
//国际化
const { t } = useLocale();
</script>
<template>
  <h-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
    <!-- <template #content> 标签中的内容将插入到 Tooltip 组件的具名插槽 content 中 -->
    <template #content>
      <div class="er-popconfirm" :style="style">
        <div class="er-popconfirm__main">
          <h-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
          {{ title }}
        </div>
        <div class="er-popconfirm__action">
          <h-button
            class="er-popconfirm__cancel"
            size="small"
            :type="cancelButtonType"
            @click="cancel"
          >
            {{ cancelButtonText || t("popconfirm.cancelButtonText") }}
          </h-button>
          <h-button
            class="er-popconfirm__confirm"
            size="small"
            :type="confirmButtonType"
            @click="confirm"
          >
            {{ confirmButtonText || t("popconfirm.confirmButtonText") }}
          </h-button>
        </div>
      </div>
    </template>
    <!-- 检查父组件是否传递了内容到 default 插槽（即未命名的插槽）。如果父组件传入了内容，$slots.default 将不为 undefined，v-if 判断条件为 true，然后渲染 default 插槽中的内容。 -->
    <template v-if="$slots.default" #default>
      <slot name="default"></slot>
    </template>
    <!-- $slots.reference 检查是否存在名为 reference 的插槽内容。如果传递了该插槽内容，则渲染该插槽中的内容。 -->
    <template v-if="$slots.reference" #default>
      <slot name="reference"></slot>
    </template>
  </h-tooltip>
</template>
<style scoped>
@import "./style.css";
</style>
