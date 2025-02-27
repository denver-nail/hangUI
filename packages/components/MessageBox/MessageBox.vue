<script setup lang="ts">
import type { MessageBoxAction, MessageBoxProps } from "./types";
import type { InputInstance } from "../Input/types";
import { isFunction, isNil } from "lodash-es";
import { useZIndex, useId } from "@hangui/hooks";
import { computed, reactive, type Ref, watch, nextTick, ref } from "vue";
import { typeIconMap } from "@hangui/utils";
import HIcon from "../Icon/Icon.vue";
import HButton from "../Button/Button.vue";
import HInput from "../Input/Input.vue";
import HOverlay from "../Overlay/Overlay.vue";
defineOptions({
  name: "HMessageBox",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<MessageBoxProps>(), {
  lockScroll: true,
  showClose: true,
  closeOnClickModal: true,
  confirmButtonType: "primary",
  roundButton: false,
  boxType: "",
  inputValue: "",
  inputPlaceholder: "Please input...",
  confirmButtonText: "Ok",
  cancelButtonText: "Cancel",
  showConfirmButton: true,
});
const headerRef = ref<HTMLElement>();
const inputRef = ref<InputInstance>();
const { doAction } = props;
const { nextZIndex } = useZIndex();
const state = reactive({
  ...props,
  zIndex: nextZIndex(),
});
const inputId = useId();
const hasMessage = computed(() => !!state.message);
const iconComponent = computed(
  () => state.icon ?? typeIconMap.get(state.type ?? "")
);
function handleWrapperClick() {
  props.closeOnClickModal && handleAction("close");
}
function handleAction(action: MessageBoxAction) {
  isFunction(props.beforeClose)
    ? props.beforeClose(action, state, () => doAction(action, state.inputValue))
    : doAction(action, state.inputValue);
}
function handleInputEnter(e: KeyboardEvent) {
  if (state.inputType === "textarea") {
    return;
  }
  e.preventDefault();
  return handleAction("confirm");
}
function handleClose() {
  handleAction("close");
}
watch(
  () => props.visible?.value,
  (val) => {
    // 当弹窗显示时，更新 z-index 以确保在最上层
    if (val) state.zIndex = nextZIndex();
    // 如果不是 prompt 类型的弹窗，直接返回
    if (props.boxType !== "prompt") return;
    // 如果弹窗不可见，直接返回
    if (!val) return;
    // 等待下一个 DOM 更新周期
    nextTick(() => {
      // 如果 inputRef 存在，则聚焦输入框
      inputRef.value && inputRef.value.focus();
    });
  }
);
</script>
<template>
  <transition name="fade-in-linear" @after-leave="destroy">
    <h-overlay v-show="(visible as Ref).value" :z-index="state.zIndex" mask>
      <div
        role="dialog"
        class="er-overlay-message-box"
        @click="handleWrapperClick"
      >
        <div
          ref="rootRef"
          :class="[
            'er-message-box',
            {
              'is-center': state.center,
            },
          ]"
          @click.stop
        >
          <!-- 头部 -->
          <div
            v-if="!isNil(state.title)"
            ref="headerRef"
            class="er-message-box__header"
            :class="{ 'show-close': state.showClose }"
          >
            <div class="er-message-box__title">
              <h-icon
                v-if="iconComponent && state.center"
                :class="{
                  [`er-icon-${state.type}`]: state.type,
                }"
                :icon="iconComponent"
              />
              {{ state.title }}
            </div>
            <button
              v-if="showClose"
              class="er-message-box__header-btn"
              @click.stop="handleClose"
            >
              <h-icon icon="xmark" />
            </button>
          </div>
          <!-- 内容 -->
          <div class="er-message-box__content">
            <h-icon
              v-if="iconComponent && !state.center && hasMessage"
              :class="{
                [`er-icon-${state.type}`]: state.type,
              }"
              :icon="iconComponent"
            />
            <div v-if="hasMessage" class="er-message-box__message">
              <slot>
                <component
                  :is="state.showInput ? 'label' : 'p'"
                  :for="state.showInput ? inputId : void 0"
                >
                  {{ state.message }}
                </component>
              </slot>
            </div>
          </div>
          <div v-show="state.showInput" class="er-message-box__input">
            <h-input
              v-model="state.inputValue"
              ref="inputRef"
              :placeholder="state.inputPlaceholder"
              :type="state.inputType"
              @keyup.enter="handleInputEnter"
            />
          </div>
          <!-- 底部 -->
          <div class="er-message-box__footer">
            <h-button
              v-if="state.showCancelButton"
              class="er-message-box__footer-btn er-message-box__cancel-btn"
              :type="state.cancelButtonType"
              :round="state.roundButton"
              :loading="state.cancelButtonLoading"
              @click="handleAction('cancel')"
              @keydown.prevent.enter="handleAction('cancel')"
              >{{ state.cancelButtonText }}
            </h-button>
            <h-button
              v-show="state.showConfirmButton"
              class="er-message-box__footer-btn er-message-box__confirm-btn"
              :type="state.confirmButtonType ?? 'primary'"
              :round="state.roundButton"
              :loading="state.confirmButtonLoading"
              @click="handleAction('confirm')"
              @keydown.prevent.enter="handleAction('confirm')"
              >{{ state.confirmButtonText }}
            </h-button>
          </div>
        </div>
      </div>
    </h-overlay>
  </transition>
</template>
<style scoped>
@import "./style.css";
</style>
