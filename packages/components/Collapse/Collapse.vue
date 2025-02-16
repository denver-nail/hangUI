<script setup lang="ts">
import type { CollapseProps, CollapseEmits, CollapseItemName } from './types';
import { ref, provide, watch, watchEffect } from 'vue';
import { COLLAPSE_CTX_KEY } from './constants';
import { debugWarn } from '@hangui/utils';
const COM_NAME = 'HCollapse' as const
defineOptions({
    name: COM_NAME
})
//定义的所需参数
const props = defineProps<CollapseProps>()
//定义的相关事件
const emits = defineEmits<CollapseEmits>();
//记录激活状态的Item名字
const activeNames = ref(props.modelValue)
//手风琴模式下如果激活状态下的itme数目大于1则报错(一直监听props中的相关属性的变化)
watchEffect(() => {
    if (props.accordion && activeNames.value.length > 1) {
        //使用自己封装的报错方法
        debugWarn(COM_NAME, "accordion mode should only have one active item")
    }
})

//折叠面板组件的每一个小item的点击事件
function handleItemClick(item: CollapseItemName) {
    //
    let _activeNames = [...activeNames.value]
    //如果处于手风琴模式，确保激活的Items的数组长度为1
    if (props.accordion) {
        _activeNames = [_activeNames[0] === item ? "" : item]
        updateActiveNames(_activeNames)
        return
    }
    const index = _activeNames.indexOf(item);
    //如果当前的item正处于激活状态就从激活数组中删除，否则就添加进去。
    if (index > -1) {
        _activeNames.splice(index, 1);
    } else {
        _activeNames.push(item)
    }
    updateActiveNames(_activeNames)
}
//更新activeNames时需要触发的函数
function updateActiveNames(newNames: CollapseItemName[]) {
    activeNames.value = newNames;
    //其他组件触发update:modelValue和change事件时传递newNames过去
    emits("update:modelValue", newNames);
    emits("change", newNames)
}
//监听props.modelValue的变化
watch(() => props.modelValue,
    (newNames) => updateActiveNames(newNames))
//依赖注入：将属性或者方法提供给子组件使用
provide(COLLAPSE_CTX_KEY, {
    activeNames,
    handleItemClick
})
</script>
<template>
    <div class="er-collapse">
        <slot></slot>
    </div>
</template>

<style scoped>
@import "./style.css";
</style>