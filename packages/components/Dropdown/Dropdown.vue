<script setup lang="ts">
import { computed, ref, provide } from "vue";
import type {
  DropdownItemProps,
  DropdownEmits,
  DropdownProps,
  DropdownInstance,
  DropdownContext,
} from "./types";
import type { TooltipInstance } from "../Tooltip/types";
import type { ButtonInstance } from "../Button/types";
import { HButton, HButtonGroup } from "../Button/index.ts";
import { isNil, omit } from "lodash-es";
import HTooltip from "../Tooltip/Tooltip.vue";
import HDropdownItem from "./DropdownItem.vue";
import { DROPDOWN_CTX_KEY } from "./contants.ts";
import { useDisabledStyle } from "@hangui/hooks";
defineOptions({
  name: "HDropdown",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<DropdownProps>(), {
  hideOnClick: true,
  items: () => [] as DropdownItemProps[],
});
const emits = defineEmits<DropdownEmits>();
const slots = defineSlots();
const tooltipRef = ref<TooltipInstance>();
const triggerRef = ref<ButtonInstance>();
const tooltipProps = computed(() =>
  omit(props, ["items", "hideOnclick", "type", "size", "splitButton"])
);
const virtualRef = computed(() => triggerRef.value?.ref ?? void 0);
function handleItemClick(e: DropdownItemProps) {
  props.hideOnClick && tooltipRef.value?.hide();
  !isNil(e.command) && emits("command", e.command);
}
provide<DropdownContext>(DROPDOWN_CTX_KEY, {
  handleItemClick,
  size: computed(() => props.size),
});
useDisabledStyle();
defineExpose<DropdownInstance>({
  open: () => tooltipRef.value?.show(),
  close: () => tooltipRef.value?.hide(),
});
</script>
<template>
  <div class="er-dropdown" :class="{ 'is-disabled': props.disabled }">
    <h-tooltip
      ref="tooltipRef"
      v-bind="tooltipProps"
      :virtual-triggering="splitButton"
      :virtual-ref="virtualRef?.value"
      @visible-change="$emit('visible-change', $event)"
    >
      <h-button-group
        v-if="splitButton"
        :type="type"
        :size="size"
        :disabled="disabled"
      >
        <h-button @click="$emit('click', $event)">
          <slot name="default"></slot>
        </h-button>
        <h-button ref="triggerRef" icon="angle-down"></h-button>
      </h-button-group>
      <slot name="default" v-else></slot>
      <template #content>
        <div class="er-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="item.command">
              <h-dropdown-item v-bind="item" />
            </template>
          </slot>
        </div>
      </template>
    </h-tooltip>
  </div>
</template>
<style scoped>
@import "./style.css";
:deep(.er-button-group) {
  & > :last-child {
    padding: 5px 7px;
  }
}
</style>
