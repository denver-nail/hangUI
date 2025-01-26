<script setup lang="ts">
import type { CollapseItemProps } from './types';
import { inject, computed } from 'vue';
import { COLLAPSE_CTX_KEY } from './constants';
import HIcon from '../Icon/Icon.vue';
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
            <h-icon
                icon="angle-right"
                class="header-angle"
            />
        </div>

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

    </div>
</template>
<style scoped>
@import "./style.css";
</style>