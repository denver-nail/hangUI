<script setup lang="ts">
import { computed } from 'vue';
import type { IconProps } from './types'
import { omit } from 'lodash-es';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
defineOptions({
    name: 'HIcon',
    //禁止透传属性
    inheritAttrs: false
})
const props = defineProps<IconProps>()
//从组件接收的参数中剔除自定义的type和color属性
const filterProps = computed(() => omit(props, ['type', 'color']))
//自定义颜色的计算属性
const customStyles = computed(() => ({ color: props.color ?? void 0 }))
</script>
<template>
    <!--TODO:注意这里的$attrs的使用 -->
    <i
        class="er-icon"
        :class="[`er-icon-${type}`]"
        :style="customStyles"
        v-bind="$attrs"
    >
        <font-awesome-icon v-bind="filterProps" />
    </i>
</template>

<style scoped>
@import "./style.css"
</style>