<script setup lang="ts">
import type { CollapseItemProps } from './types';
import { inject, computed } from 'vue';
import { COLLAPSE_CTX_KEY } from './constants';
import HIcon from '../Icon/Icon.vue';
import transitionEvents from './transitionEvents';
defineOptions({
    name: 'HCollapseItem'
})
//定于所需的参数
const props = defineProps<CollapseItemProps>()
//从祖先组件获取数据
const ctx = inject(COLLAPSE_CTX_KEY, void 0);
//只有祖先组件传递的activeNames中包含当前组件的name值才为true
const isActive = computed(() => {
    return ctx?.activeNames.value?.includes(props.name)
})
//当前组件的点击事件
function handleClick() {
    //如果当前组件被禁用了
    if (props.disabled) return;
    //当前组件没有被禁用则调用祖先组件传递的点击事件的回调
    ctx?.handleItemClick(props.name)
}
</script>
<template>
    <div
        class="er-collapse-item"
        :class="{
            'is-disabled': disabled,
        }"
    >
        <!-- 头部 -->
        <div
            class="er-collapse-item__header"
            :id="`item-header-${name}`"
            :class="{
                'is-disabled': disabled,
                'is-active': isActive,
            }"
            @click="handleClick"
        >
            <span class="er-collapse-item__title">
                <slot name="title">
                    {{ title }}
                </slot>
            </span>
            <!-- 展开图标 -->
            <h-icon
                icon="angle-right"
                class="header-angle"
            />
        </div>
        <!-- 内容区 -->
        <!-- 注意transition这里的name要与style.css中定义的过渡的类名相同，过渡的细节由css和钩子函数共同实现-->
        <transition
            name="slide"
            v-on="transitionEvents"
        >
            <!-- <transition>: 用于为包裹的 DOM 元素提供过渡效果。在 Vue.js 中，<transition> 组件负责处理进入、离开和其他过渡状态（如改变大小）的效果。
            name="slide": name 属性设置了过渡的基础类名前缀。在这个例子中，slide 是过渡效果的名称，Vue 会根据这个名称自动生成相关的 CSS 类，例如 .slide-enter、.slide-enter-active、.slide-leave 等，这些类用来控制元素在进入和离开时的动画效果。

            v-on="transitionEvents": v-on 是 Vue 的一个指令，绑定一个对象中的事件监听器。transitionEvents 是一个 JavaScript 对象，包含了与过渡相关的钩子函数（如 beforeEnter、enter、afterEnter 等）。这些钩子函数将被应用到 <transition> 组件中，从而控制元素的过渡过程。 -->
            <div
                class="er-collapse-item__wapper"
                v-show="isActive"
            >
                <div
                    class="er-collapse-item__content"
                    :id="`item-content-${name}`"
                >
                    <slot></slot>
                </div>
            </div>
        </transition>


    </div>
</template>
<style scoped>
@import "./style.css";
</style>