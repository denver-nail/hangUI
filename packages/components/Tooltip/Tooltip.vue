<script setup lang="ts">
import { ref, type Ref, computed, watchEffect, watch, onUnmounted } from "vue";
import type { TooltipEmits, TooltipInstance, TooltipProps } from "./types";
import { bind, debounce, type DebouncedFunc, isNil } from "lodash-es";
import { createPopper, type Instance } from "@popperjs/core";
import { useClickOutside } from "@hangui/hooks";
import useEvenstToTiggerNode from "./useEventsTriggerNode";
defineOptions({
    name: "HTooltip",
});

interface _TooltipProps extends TooltipProps {
    virtualRef?: HTMLElement | void;
    virtualTriggering?: boolean;
}
const props = withDefaults(defineProps<_TooltipProps>(), {
    placement: "bottom",
    trigger: "hover",
    transition: "fade",
    showTimeout: 0,
    hideTimeout: 200,
});
const emits = defineEmits<TooltipEmits>();
//标识组件可见性
const visible = ref(false);
//定义一个响应式对象 events，它的类型是一个键为字符串、值为 EventListener 函数的对象。
const events: Ref<Record<string, EventListener>> = ref({});
const outerEvents: Ref<Record<string, EventListener>> = ref({});
const dropdownEvents: Ref<Record<string, EventListener>> = ref({});

const containerNode = ref<HTMLElement>();
const popperNode = ref<HTMLElement>();
const _triggerNode = ref<HTMLElement>();

const triggerNode = computed(() => {
    if (props.virtualTriggering) {
        return (props.virtualRef as HTMLElement) ?? _triggerNode.value;
    }
    return _triggerNode.value as HTMLElement;
});
// popperJS封装的options
const popperOptions = computed(() => ({
    placement: props.placement,
    modifiers: [
        {
            name: "offset",
            options: {
                offset: [0, 9],
            },
        },
    ],
    ...props.popperOptions,
}));
//声明两个防抖函数：后续在watchEffect中实现赋值
let openDebounce: DebouncedFunc<() => void> | void;
let closeDebounce: DebouncedFunc<() => void> | void;
//计算在hover方式触发下应该延迟的时长
const openDelay = computed(() =>
    props.trigger === "hover" ? props.showTimeout : 0
);
const closeDelay = computed(() =>
    props.trigger === "hover" ? props.hideTimeout : 0
);

function openFinal() {
    // 如果 closeDebounce 存在，则调用它的 cancel 方法，取消关闭的防抖操作
    closeDebounce?.cancel();
    // 如果 openDebounce 存在，则调用它，执行打开的防抖操作
    openDebounce?.();
}
function closeFinal() {
    // 如果 openDebounce 存在，则调用它的 cancel 方法，取消打开的防抖操作
    openDebounce?.cancel();
    // 如果 closeDebounce 存在，则调用它，执行关闭的防抖操作
    closeDebounce?.();
}
//切换可见性
function togglePopper() {
    visible.value ? closeFinal() : openFinal();
}
//设置可见性
function setVisible(val: boolean) {
    if (props.disabled) return;
    //更新组件可见性
    visible.value = val;
    //触发组件可见性变化事件
    emits("visible-change", val);
}
//根据 props.trigger 的不同值，绑定不同的事件到外层元素或下拉菜单元素。
function attachEvents() {
    // 如果组件被禁用或设置为手动模式，则不绑定任何事件
    if (props.disabled || props.manual) return;

    // 如果触发方式为 "hover"
    if (props.trigger === "hover") {
        // 绑定鼠标移入事件到外层元素，触发 openFinal 函数
        events.value["mouseenter"] = openFinal;
        // 绑定鼠标移出事件到外层元素，触发 closeFinal 函数
        outerEvents.value["mouseleave"] = closeFinal;
        // 绑定鼠标移入事件到下拉菜单元素，触发 openFinal 函数
        dropdownEvents.value["mouseenter"] = openFinal;
        return; // 结束函数执行
    }

    // 如果触发方式为 "click"
    if (props.trigger === "click") {
        // 绑定点击事件到外层元素，触发 togglePopper 函数
        events.value["click"] = togglePopper;
        return;
    }

    // 如果触发方式为 "contextmenu"（右键菜单）
    if (props.trigger === "contextmenu") {
        // 绑定右键点击事件到外层元素
        events.value["contextmenu"] = (e) => {
            e.preventDefault(); // 阻止默认的右键菜单行为
            openFinal(); // 触发 openFinal 函数
        };
        return;
    }
}
//popper实例的声明
let popperInstance: null | Instance;
//删除popper实例的方法
function destroyPopperInstance() {
    if (isNil(popperInstance)) return;
    popperInstance.destroy();
    popperInstance = null;
}
//重置事件绑定
function resetEvents() {
    //先重置所有事件绑定
    events.value = {};
    outerEvents.value = {};
    dropdownEvents.value = {};
    //重新执行绑定
    attachEvents();
}
const show: TooltipInstance["show"] = openFinal;
const hide: TooltipInstance["hide"] = function () {
    openDebounce?.cancel();
    setVisible(false);
};
//监听visible变化
watch(
    visible,
    (val) => {
        //visible为true直接返回
        if (!val) return;
        //visible 为false时
        if (_triggerNode.value && popperNode.value) {
            popperInstance = createPopper(
                _triggerNode.value,
                popperNode.value,
                popperOptions.value
            );
        }
    },
    { flush: "post" }
);
//监听props.manual的变化
watch(
    () => props.manual,
    (isManual) => {
        if (isManual) {
            resetEvents();
            return;
        }
        attachEvents();
    }
);

//监听props.trigger的变化
watch(
    () => props.trigger,
    (val, oldVal) => {
        if (val === oldVal) return;
        openDebounce?.cancel();
        visible.value = false;
        emits("visible-change", false);
        resetEvents();
    }
);
watchEffect(() => {
    //不是手动模式则绑定事件
    if (!props.manual) {
        attachEvents();
    }
    //创建一个防抖函数，并将 setVisible 函数的 this 绑定到 null，同时预先填充参数 true，openDelay.value是防抖的延迟时间（以毫秒为单位）。
    openDebounce = debounce(bind(setVisible, null, true), openDelay.value);
    closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value);
});
//点击外部节点的处理
useClickOutside(containerNode, () => {
    emits("click-outside");
    if (props.trigger === "hover" || props.manual) return;
    visible.value && closeFinal();
});
// 对虚拟节点的事件的处理
useEvenstToTiggerNode(props, triggerNode, events, () => {
    openDebounce?.cancel();
    setVisible(false);
});
onUnmounted(() => {
    destroyPopperInstance();
});
// 暴露给外部的方法
defineExpose<TooltipInstance>({
    show,
    hide,
});
</script>
<template>
    <div
        class="er-tooltip"
        ref="containerNode"
        v-on="outerEvents"
    >
        <div
            class="er-tooltip__trigger"
            ref="_triggerNode"
            v-on="events"
            v-if="!virtualTriggering"
        >
            <slot></slot>
        </div>
        <slot
            name="default"
            v-else
        > </slot>
        <transition
            :name="transition"
            @after-leave="destroyPopperInstance"
        >
            <div
                class="er-tooltip__popper"
                ref="popperNode"
                v-on="dropdownEvents"
                v-if="visible"
            >
                <slot name="content">
                    {{ content }}
                </slot>
                <div
                    id="arrow"
                    data-popper-arrow
                ></div>
            </div>
        </transition>
    </div>
</template>
<style scoped>
@import "./style.css";
</style>
