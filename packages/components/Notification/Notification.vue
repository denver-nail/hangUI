<script setup lang="ts">
import type { NotificationProps, NotificationCompInstance } from "./types";
import HIcon from "../Icon/Icon.vue";
import { bind, delay } from "lodash-es";
import { typeIconMap, RenderVnode, addUnit } from "@hangui/utils";
import { useOffset } from "@hangui/hooks";
import { computed, onMounted, ref } from "vue";
import { getLastBottomOffset } from "./methods";
defineOptions({
  name: "HNotification",
});
const props = withDefaults(defineProps<NotificationProps>(), {
  type: "info",
  duration: 3000,
  closable: false,
  offset: 20,
  transitionName: "fade",
  showClose: true,
  position: "top-right",
});
const visible = ref(false);
const notifyRef = ref<HTMLDivElement>();
//div高度
const boxHeight = ref(0);
const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");
//计算该notification的top和bottom偏移量
const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),
  boxHeight,
  offset: props.offset,
});

//处理组件出现的方位相关的属性
const horizontalClass = computed(() => {
  return props.position.endsWith("right") ? "right" : "left";
});
const verticalClass = computed(() => {
  return props.position.startsWith("top") ? "top" : "bottom";
});
const customStyle = computed(() => ({
  [verticalClass.value]: addUnit(topOffset.value),
  zIndex: props.zIndex,
}));
//计时器
let timer: number;
function startTimmer() {
  if (props.duration == 0) return;
  timer = delay(() => {
    close();
  }, props.duration);
}
function clearTimer() {
  if (timer) {
    clearTimeout(timer);
  }
}
function close() {
  visible.value = false;
}
onMounted(() => {
  visible.value = true;
  startTimmer();
});

defineExpose<NotificationCompInstance>({
  close,
  bottomOffset,
});
</script>
<template>
  <transition
    :name="`er-notification-${transitionName}`"
    @after-leave="!visible && onDestory()"
    @enter="boxHeight = notifyRef!.getBoundingClientRect().height"
  >
    <div
      ref="notifyRef"
      class="er-notification"
      :class="{
        [`er-notification--${type}`]: type,
        [horizontalClass]: true,
        'show-close': showClose,
      }"
      :style="customStyle"
      v-show="visible"
      role="alert"
      @click="onClick"
      @mouseenter="clearTimer"
      @mouseleave="startTimmer"
    >
      <h-icon v-if="iconName" :icon="iconName" class="er-notification__icon" />

      <div class="er-notification__text">
        <div class="er-notification__title">{{ title }}</div>
        <div class="er-notification__content">
          <slot>
            <render-vnode v-if="message" :vNode="message" />
          </slot>
        </div>
      </div>
      <div class="er-notification__close" v-if="showClose">
        <h-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </transition>
</template>
<style scoped>
@import "./style.css";
</style>
