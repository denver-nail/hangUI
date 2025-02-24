<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { MessageProps, MessageCompInstance } from "./types";
import HIcon from "../Icon/Icon.vue";
import { bind, delay } from "lodash-es";
import { typeIconMap, RenderVnode, addUnit } from "@hangui/utils";
import { useEventListener, useOffset } from "@hangui/hooks";
import { getLastBottomOffset } from "./methods";

defineOptions({
  name: "HMessage",
});
const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  offset: 10,
  duration: 3000,
  transitionName: "fade-up",
});

const visible = ref(false);
const messageRef = ref<HTMLDivElement>();
const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info");
//div高度
const boxHeight = ref(0);
//计算该message的top和bottom偏移量
const { topOffset, bottomOffset } = useOffset({
  getLastBottomOffset: bind(getLastBottomOffset, props),
  boxHeight,
  offset: props.offset,
});
const customStyle = computed(() => ({
  top: addUnit(topOffset.value),
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
watch(visible, (val) => {
  //使得退出的动画更流畅
  if (!val) boxHeight.value = -props.offset;
});
//添加esc键盘点击事件关闭当前message组件
useEventListener(document, "keydown", (e: Event) => {
  const { code } = e as KeyboardEvent;
  if (code === "Escape") {
    close();
  }
});
onMounted(() => {
  visible.value = true;
  startTimmer();
});
defineExpose<MessageCompInstance>({
  close,
  bottomOffset,
});
</script>
<template>
  <Transition
    :name="transitionName"
    @enter="boxHeight = messageRef!.getBoundingClientRect().height"
    @after-leave="!visible && onDestory()"
  >
    <div
      ref="messageRef"
      class="er-message"
      :style="customStyle"
      :class="{
        [`er-message--${type}`]: type,
        'is-close': showClose,
        'text-center': center,
      }"
      v-show="visible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimmer"
    >
      <h-icon class="er-message__icon" :icon="iconName" />
      <div class="er-message__content">
        <slot>
          <render-vnode v-if="message" :vNode="message" />
        </slot>
      </div>
      <div class="er-message__close" v-if="showClose">
        <h-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </Transition>
</template>
<style scoped>
@import "./style.css";
</style>
