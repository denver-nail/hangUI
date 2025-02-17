<script setup lang="ts">
import type { AlertProps, AlertEmits, AlertInstance } from "./types"
import { typeIconMap } from "@hangui/utils"
import { computed, ref } from "vue";
import HIcon from "../Icon/Icon.vue"
defineOptions({
    name: 'HAlert'
})
const props = withDefaults(defineProps<AlertProps>(), {
    effect: "light",
    type: "info",
    closable: true
})
const emits = defineEmits<AlertEmits>();
const slots = defineSlots();
const visible = ref(true);//可见性控制
//计算属性控制类名
const withDescription = computed(() => props.description || slots.default)
//计算属性控制图标
const iconName = computed(() => typeIconMap.get(props.type) ?? "circle-info")
//暴露给外面的关闭方法
function close() {
    visible.value = false;
    emits("close")
}
//暴露给外面的打开方法
function open() {
    visible.value = true;
}
defineExpose<AlertInstance>({ close, open })
</script>
<template>
    <transition name="er-alert-fade">
        <!-- 使用v-show来实现可见性的切换 -->
        <div
            v-show="visible"
            class="er-alert"
            role="alert"
            :class="{
                [`er-alert__${type}`]: type,
                [`er-alert__${effect}`]: effect,
                'text-center': center,
            }"
        >
            <h-icon
                v-if="showIcon"
                class="er-alert__icon"
                :class="{ 'big-icon': withDescription }"
                :icon="iconName"
            />
            <div class="er-alert__content">
                <span
                    class="er-alert__title"
                    :class="{ 'with-desc': withDescription }"
                    :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
                >
                    <slot name="title">{{ title }}</slot>
                </span>
                <p class="er-alert__description">
                    <slot>{{ description }}</slot>
                </p>
                <div
                    class="er-alert__close"
                    v-if="closable"
                >
                    <h-icon
                        @click.stop="close"
                        icon="xmark"
                    />
                </div>
            </div>
        </div>
    </transition>
</template>
<style scoped>
@import "./style.css";
</style>