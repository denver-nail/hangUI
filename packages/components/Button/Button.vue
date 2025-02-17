<script setup lang="ts">
import { computed, ref, inject } from 'vue';
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types';
import { throttle } from 'lodash-es';
import HIcon from '../Icon/Icon.vue';
import { BUTTON_GROUP_CTX_KEY } from './constants';
defineOptions({
    name: 'HButton'
})
//设置Button组件所需参数和参数默认值
const props = withDefaults(defineProps<ButtonProps>(), {
    tag: "button",
    nativeType: "button",
    useThrottle: true,
    throttleDuration: 500,

})
//获取从祖先组件通过依赖注入的方式传递的上下文
const ctx = inject(BUTTON_GROUP_CTX_KEY)
//button的size属性
const size = computed(() => ctx?.size ?? props?.size ?? "");
//button的type属性
const type = computed(() => ctx?.type ?? props?.type ?? "");
//button的disabled属性
const disabled = computed(() => !!(ctx?.disabled || props?.disabled));

//用于定义插槽，允许父组件向按钮内部插入内容。
const slots = defineSlots()
//_ref 是一个响应式引用，用于绑定到按钮元素上，方便后续操作（如获取 DOM 元素）。
const _ref = ref<HTMLButtonElement>()
//定义emit发射事件
const emits = defineEmits<ButtonEmits>()
//按钮的点击事件
const handleBtnClick = (e: MouseEvent) => emits('click', e);
//给按钮的点击事件添加节流(使用lodash库提供的节流函数)
const handleBtnClickThrottle = throttle(handleBtnClick, props.throttleDuration, { trailing: false })
//图标的样式（根据有没有默认slot）
const iconStyle = computed(() => ({ marginRight: slots.default ? "6px" : '0px' }))


//组件暴露的内容
defineExpose<ButtonInstance>({ ref: _ref, disabled, size, type })
</script>
<template>
    <component
        :is="tag"
        ref="_ref"
        class="er-button"
        :class="{
            [`er-button--${type}`]: type,
            [`er-button--${size}`]: size,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
            'is-disabled': disabled,
            'is-loading': loading,

        }"
        :autofocus="autofocus"
        :disabled="disabled || loading ? true : void 0"
        :type="tag === 'button' ? nativeType : void 0"
        @click="(e: MouseEvent) => useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)"
    >
        <!-- 加载图标 -->
        <template v-if="loading">
            <slot name="loading">
                <h-icon
                    class="loading-icon"
                    :icon="loadingIcon || 'spinner'"
                    :style="iconStyle"
                    size="1x"
                    spin
                />
            </slot>
        </template>
        <h-icon
            :icon="icon"
            size="1x"
            :style="iconStyle"
            v-if="icon && !loading"
        />
        <!-- 插槽允许父组件在按钮内部插入自定义内容，例如文字或图标。 -->
        <slot></slot>
    </component>
</template>
<style scoped>
@import './style.css';
</style>
