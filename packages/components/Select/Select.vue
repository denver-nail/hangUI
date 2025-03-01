<script setup lang="ts">
import type {
  SelectProps,
  SelectEmits,
  SelectContext,
  SelectInstance,
  SelectStates,
  SelectOptionProps,
} from "./types";
import type { TooltipInstance } from "../Tooltip/types";
import type { InputInstance } from "../Input/types";

import {
  h,
  computed,
  ref,
  reactive,
  provide,
  watch,
  nextTick,
  type VNode,
  onMounted,
} from "vue";
import { useFocusController, useClickOutside } from "@hangui/hooks";
import { POPPER_OPTIONS, SELECT_CTX_KEY } from "./constants";
import {
  each,
  eq,
  filter,
  find,
  get,
  size,
  noop,
  isFunction,
  map,
  assign,
  isNil,
  isBoolean,
  includes,
  debounce,
} from "lodash-es";

import useKeyMap from "./useKeyMap";
import { useFormItem, useFormDisabled, useFormItemInputId } from "../Form";
import HOption from "./Option.vue";
import HTooltip from "../Tooltip/Tooltip.vue";
import HInput from "../Input/Input.vue";
import HIcon from "../Icon/Icon.vue";
import { debugWarn, RenderVnode } from "@hangui/utils";

const COMPONENT_NAME = "HSelect";
// 定义组件名称为 "HSelect"
defineOptions({ name: COMPONENT_NAME });

// 定义组件的 props，并设置默认值
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [], // 默认选项为空数组
});

// 定义组件的 emits 事件
const emits = defineEmits<SelectEmits>();

// 获取组件的 slots
const slots = defineSlots();

// 定义 ref 引用
const selectRef = ref<HTMLElement>(); // 选择器根元素
const tooltipRef = ref<TooltipInstance>(); // Tooltip 实例
const inputRef = ref<InputInstance>(); // 输入框实例

// 定义过滤后的子选项和选项
const filteredChilds = ref<Map<VNode, SelectOptionProps>>(new Map()); // 过滤后的子选项
const filteredOptions = ref(props.options ?? []); // 过滤后的选项，默认为 props.options

// 定义下拉框是否可见
const isDropdownVisible = ref(false);

// 根据 modelValue 查找初始选项
const initialOption = findOption(props.modelValue);

// 定义选择器的状态
const selectStates = reactive<SelectStates>({
  inputValue: initialOption?.label ?? "", // 输入框的值，默认为初始选项的 label
  selectedOption: initialOption, // 当前选中的选项
  mouseHover: false, // 鼠标是否悬停
  loading: false, // 是否正在加载
  highlightedIndex: -1, // 当前高亮选项的索引
});

// 计算属性：是否禁用
const isDisabled = useFormDisabled();
const { formItem } = useFormItem();
// 计算属性：子选项
const children = computed(
  () => filter(slots?.default?.(), (child) => eq(child.type, HOption)) // 过滤出类型为 HOption 的子组件
);

// 计算属性：是否有子选项
const hasChildren = computed(() => size(children.value) > 0);

// 计算属性：是否显示清除按钮
const showClear = computed(
  () =>
    props.clearable && selectStates.mouseHover && selectStates.inputValue !== "" // 当 clearable 为 true，鼠标悬停且输入框有值时显示
);

const highlightedLine = computed(() => {
  let result: SelectOptionProps | void; // 定义返回结果，类型为 SelectOptionProps 或 undefined
  if (hasChildren.value) {
    // 如果有子选项，从 filteredChilds 中获取

    const node = [...filteredChilds.value][selectStates.highlightedIndex]?.[0]; // 获取当前高亮索引对应的子选项的虚拟节点
    result = filteredChilds.value.get(node); // 从 filteredChilds 中获取对应的选项属性
  } else {
    // 否则从 filteredOptions 中获取
    result = filteredOptions.value[selectStates.highlightedIndex]; // 直接获取当前高亮索引对应的选项
  }
  return result; // 返回高亮的选项
});

// 计算属性：子选项的格式化数据
const childrenOptions = computed(() => {
  if (!hasChildren.value) return []; // 如果没有子选项，返回空数组

  return map(children.value, (item) => ({
    vNode: h(item), // 生成虚拟节点
    props: assign(item.props, {
      disabled:
        item.props?.disabled === true || // 如果 disabled 为 true 或非布尔值，则禁用
        (!isNil(item.props?.disabled) && !isBoolean(item.props?.disabled)),
    }),
  }));
});

// 计算属性：是否没有数据
const isNoData = computed(() => {
  if (!props.filterable) return false; // 如果不可过滤，返回 false
  if (!hasData.value) return true; // 如果没有数据，返回 true
  return false;
});

// 计算属性：是否有数据
const hasData = computed(
  () =>
    (hasChildren.value && filteredChilds.value.size > 0) || // 如果有子选项且 filteredChilds 不为空
    (!hasChildren.value && size(filteredOptions.value) > 0) // 或者没有子选项且 filteredOptions 不为空
);

// 计算属性：最后一个选项的索引
const lastIndex = computed(
  () =>
    hasChildren.value
      ? filteredChilds.value.size - 1 // 如果有子选项，返回 filteredChilds 的最后一个索引
      : size(filteredOptions.value) - 1 // 否则返回 filteredOptions 的最后一个索引
);

// 计算属性：输入框的占位符
const filterPlaceholder = computed(
  () =>
    props.filterable && selectStates.selectedOption && isDropdownVisible.value
      ? selectStates.selectedOption.label // 如果可过滤且选中了选项且下拉框可见，显示选中选项的 label
      : props.placeholder // 否则显示默认占位符
);

// 计算属性：防抖时间
const timeout = computed(() => (props.remote ? 300 : 100)); // 如果是远程搜索，防抖时间为 300ms，否则为 100ms
const handleFilterDebounce = debounce(handleFilter, timeout.value); // 防抖处理过滤函数

const { inputId } = useFormItemInputId(props, formItem); // 生成唯一的输入框 ID
const {
  wrapperRef: inputWrapperRef,
  isFocused,
  handleBlur,
  handleFocus,
} = useFocusController(inputRef); // 使用焦点控制器管理输入框的焦点状态

const keyMap = useKeyMap({
  isDropdownVisible,
  controlVisible,
  selectStates,
  highlightedLine,
  handleSelect,
  hasData,
  lastIndex,
}); // 初始化键盘映射

useClickOutside(selectRef, (e) => handleClickOutside(e)); // 监听点击外部事件

const focus: SelectInstance["focus"] = function () {
  inputRef.value?.focus(); // 聚焦输入框
};

const blur: SelectInstance["blur"] = function () {
  handleClickOutside(); // 失焦时处理点击外部逻辑
};

function handleClickOutside(e?: Event) {
  if (isFocused.value) {
    nextTick(() => handleBlur(new FocusEvent("focus", e))); // 如果当前聚焦，延迟触发失焦事件
  }
}

function controlVisible(visible: boolean) {
  if (!tooltipRef.value) return;
  get(tooltipRef, ["value", visible ? "show" : "hide"])?.(); // 控制 Tooltip 的显示/隐藏
  props.filterable && controlInputVal(visible); // 如果可过滤，控制输入框的值
  isDropdownVisible.value = visible; // 更新下拉框可见状态
  emits("visible-change", visible); // 触发 visible-change 事件

  selectStates.highlightedIndex = -1; // 重置高亮索引
}

function controlInputVal(visible: boolean) {
  if (!props.filterable) return;
  if (visible) {
    if (selectStates.selectedOption) selectStates.inputValue = ""; // 如果下拉框可见且已选中选项，清空输入框
    handleFilterDebounce(); // 触发过滤函数
    return;
  }
  selectStates.inputValue = selectStates.selectedOption?.label || ""; // 如果下拉框不可见，恢复输入框的值
}

function toggleVisible() {
  if (isDisabled.value) return;
  console.log("toggleVisible");
  controlVisible(!isDropdownVisible.value); // 切换下拉框的可见性
}

function handleClear() {
  inputRef.value?.clear(); // 清空输入框
  selectStates.inputValue = ""; // 清空输入框的值
  selectStates.selectedOption = null; // 清空选中的选项

  emits("clear"); // 触发 clear 事件
  each(["change", "update:modelValue"], (k) => emits(k as any, "")); // 触发 change 和 update:modelValue 事件
  //表单清空验证事件
  formItem?.clearValidate();
}

function findOption(value: string) {
  return find(props.options, (opt) => opt.value === value); // 根据值查找选项
}

function handleSelect(opt: SelectOptionProps) {
  if (opt.disabled) return; // 如果选项禁用，直接返回

  selectStates.inputValue = opt.label; // 更新输入框的值
  selectStates.selectedOption = opt; // 更新选中的选项
  each(["change", "update:modelValue"], (k) => emits(k as any, opt.value)); // 触发 change 和 update:modelValue 事件
  controlVisible(false); // 关闭下拉框
  inputRef.value?.focus(); // 聚焦输入框
}

function setFilteredChilds(opts: typeof childrenOptions.value) {
  filteredChilds.value.clear(); // 清空过滤后的子选项
  each(opts, (item) => {
    filteredChilds.value.set(item.vNode, item.props as SelectOptionProps); // 重新设置过滤后的子选项
  });
}

function handleFilter() {
  const searcKey = selectStates.inputValue; // 获取输入框的值作为搜索关键字
  selectStates.highlightedIndex = -1; // 重置高亮索引

  if (hasChildren.value) {
    genFilterChilds(searcKey); // 如果有子选项，生成过滤后的子选项
    return;
  }
  genFilterOptions(searcKey); // 否则生成过滤后的选项
}

function handleKeyDown(e: KeyboardEvent) {
  keyMap.has(e.key) && keyMap.get(e.key)?.(e); // 根据按下的键执行对应的操作
}

async function genFilterChilds(search: string) {
  if (!props.filterable) return;

  if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    await callRemoteMethod(props.remoteMethod, search); // 如果是远程搜索，调用远程方法
    setFilteredChilds(childrenOptions.value); // 设置过滤后的子选项
    return;
  }

  if (props.filterMethod && isFunction(props.filterMethod)) {
    const opts = map(props.filterMethod(search), "value"); // 使用自定义过滤方法
    setFilteredChilds(
      filter(
        childrenOptions.value,
        (item) => includes(opts, get(item, ["props", "value"])) // 过滤子选项
      )
    );
    return;
  }

  setFilteredChilds(
    filter(
      childrenOptions.value,
      (item) => includes(get(item, ["props", "label"]), search) // 根据 label 过滤子选项
    )
  );
}

async function genFilterOptions(search: string) {
  if (!props.filterable) return;

  if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    filteredOptions.value = await callRemoteMethod(props.remoteMethod, search); // 如果是远程搜索，调用远程方法
    return;
  }

  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(search); // 使用自定义过滤方法
    return;
  }
  filteredOptions.value = filter(
    props.options,
    (opt) => includes(opt.label, search) // 根据 label 过滤选项
  );
}

async function callRemoteMethod(method: Function, search: string) {
  if (!method || !isFunction(method)) return; // 如果 method 不存在或不是函数，直接返回

  selectStates.loading = true; // 设置加载状态为 true
  let result; // 定义结果变量
  try {
    result = await method(search); // 调用远程方法并等待结果
  } catch (error) {
    debugWarn(error as Error); // 捕获错误并输出警告信息
    debugWarn(COMPONENT_NAME, "callRemoteMethod error"); // 输出组件名称和错误信息
    result = []; // 设置结果为空数组
    return Promise.reject(error); // 返回一个被拒绝的 Promise
  }
  return result; // 返回结果
}

function renderLabel(opt: SelectOptionProps): VNode | string {
  if (isFunction(props.renderLabel)) {
    return props.renderLabel(opt);
  }
  return opt.label;
}

function setSelected() {
  const opt = findOption(props.modelValue);
  if (!opt) return;
  selectStates.inputValue = opt.label;
  selectStates.selectedOption = opt;
}

watch(
  () => props.options,
  (newVal) => {
    filteredOptions.value = newVal ?? [];
  }
);

watch(
  () => childrenOptions.value,
  (newVal) => setFilteredChilds(newVal),
  { immediate: true }
);

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      formItem?.validate("change").catch((err) => debugWarn(err));
    }
    if (newVal === "") {
      (selectStates.inputValue = initialOption?.label ?? ""), // 输入框的值，默认为初始选项的 label
        (selectStates.selectedOption = initialOption);
    }
    setSelected();
  }
);

onMounted(() => {
  setSelected();
});

provide<SelectContext>(SELECT_CTX_KEY, {
  handleSelect,
  selectStates,
  renderLabel,
  highlightedLine,
});

defineExpose<SelectInstance>({
  focus,
  blur,
});
</script>

<template>
  <!-- 选择器根元素 -->
  <div
    ref="selectRef"
    class="er-select"
    :class="{
      'is-disabled': isDisabled, // 如果禁用，添加 is-disabled 类
    }"
    @click.stop="toggleVisible"
    @mouseenter="selectStates.mouseHover = true"
    @mouseleave="selectStates.mouseHover = false"
  >
    <!-- Tooltip 组件，用于显示下拉框 -->
    <h-tooltip
      ref="tooltipRef"
      placement="bottom-start"
      :popper-options="POPPER_OPTIONS"
      @click-outside="controlVisible(false)"
      manual
    >
      <!-- 默认插槽，用于显示输入框 -->
      <template #default>
        <div ref="inputWrapperRef" @keydown="handleKeyDown">
          <!-- 输入框容器，监听键盘事件 -->
          <!-- 输入框组件 -->
          <h-input
            ref="inputRef"
            v-model="selectStates.inputValue"
            :id="inputId"
            :disabled="isDisabled"
            :placeholder="filterable ? filterPlaceholder : placeholder"
            :readonly="!filterable || !isDropdownVisible"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleFilterDebounce"
          >
            <!-- 输入框后缀插槽 -->
            <template #suffix>
              <!-- 清除按钮，当 showClear 为 true 时显示 -->
              <h-icon
                v-if="showClear"
                icon="circle-xmark"
                class="er-input__clear"
                @click.stop="handleClear"
                @mousedown.prevent="noop"
              />
              <!-- 下拉箭头图标，当 showClear 为 false 时显示 -->
              <h-icon
                v-else
                class="header-angle"
                icon="angle-down"
                :class="{ 'is-active': isDropdownVisible }"
              />
            </template>
          </h-input>
        </div>
      </template>
      <!-- Tooltip 内容插槽，用于显示下拉框内容 -->
      <template #content>
        <!-- 加载状态 -->
        <div class="er-select__loading" v-if="selectStates.loading">
          <h-icon icon="spinner" spin />
          <!-- 加载图标 -->
        </div>
        <!-- 无数据状态 -->
        <div class="er-select__nodata" v-else-if="filterable && isNoData">
          No data
          <!-- 显示 "No data" 提示 -->
        </div>
        <!-- 下拉框菜单 -->
        <ul class="er-select__menu">
          <!-- 如果没有子选项，显示过滤后的选项 -->
          <template v-if="!hasChildren">
            <h-option
              v-for="item in filteredOptions"
              :key="item.value"
              v-bind="item"
            />
          </template>
          <!-- 如果有子选项，显示过滤后的子选项 -->
          <template v-else>
            <template
              v-for="[vNode, _props] in filteredChilds"
              :key="_props.value"
            >
              <!-- 渲染子选项的虚拟节点 -->
              <render-vnode :vNode="vNode" />
            </template>
          </template>
        </ul>
      </template>
    </h-tooltip>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
