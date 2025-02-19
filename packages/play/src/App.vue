<script setup lang="ts">
import { ref } from "vue";

const buttonRef = ref(null);
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
  <HButton ref="buttonRef">Click me</HButton>
</template>

<style scoped></style>
