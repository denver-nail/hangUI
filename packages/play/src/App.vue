<script setup lang="ts">
import { ref } from "vue";

const buttonRef = ref(null);
function popConfirm() {
  console.log("confirm");
}
function popCancel() {
  console.log("cancel");
}
</script>

<template>
  <!-- 使用自己的按钮组件 -->
  <HButton type="primary" size="small"> test </HButton>

  <!-- 使用自己的tooltip组件 -->
  <HTooltip
    :virtualTriggering="true"
    :virtualRef="buttonRef"
    content="This is a tooltip"
    trigger="click"
  >
    <!-- Tooltip content can be empty or have default slot content -->
  </HTooltip>
  <HButton ref="buttonRef">tooltip</HButton>

  <!-- 使用自己的Popconfirm组件 -->
  <HPopconfirm title="确定删除吗？" @confirm="popConfirm" @cancel="popCancel">
    <HButton type="primary" size="small"> popconfirm </HButton>
  </HPopconfirm>
</template>

<style scoped></style>
