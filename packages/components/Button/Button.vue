<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './types';
defineOptions({
    name: 'HButton'
})
//设置Button组件所需参数和参数默认值
const props = withDefaults(defineProps<ButtonProps>(), {
    tag: "button",
    nativeType: "button"

})
//用于定义插槽，允许父组件向按钮内部插入内容。
const slots = defineSlots()
//_ref 是一个响应式引用，用于绑定到按钮元素上，方便后续操作（如获取 DOM 元素）。
const _ref = ref<HTMLButtonElement>()
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
        :disabled="disabled || loading ? true : void 0"
        :type="tag === 'button' ? nativeType : void 0"
    >
        <!-- 插槽允许父组件在按钮内部插入自定义内容，例如文字或图标。 -->
        <slot></slot>
    </component>
</template>
