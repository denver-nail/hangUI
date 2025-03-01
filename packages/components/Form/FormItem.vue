<script setup lang="ts">
import type {
  FormItemContext,
  FormItemProps,
  FormValidateFailuer,
  FormValidateCallback,
  ValidateStatus,
  FormItemInstance,
  FormItemRule,
} from "./types";
import Schema, { type RuleItem } from "async-validator";
import {
  type Ref,
  ref,
  inject,
  onMounted,
  reactive,
  toRefs,
  computed,
  nextTick,
  onUnmounted,
  provide,
} from "vue";
import { FORM_CTX_KEY, FORM_ITEM_CTX_KEY } from "./constants";
import {
  cloneDeep,
  endsWith,
  filter,
  get,
  includes,
  isArray,
  isNil,
  isNumber,
  isString,
  keys,
  map,
  size,
  some,
} from "lodash-es";
import { useId } from "@hangui/hooks";
defineOptions({
  name: "HFormItem",
});
const props = withDefaults(defineProps<FormItemProps>(), {
  required: void 0,
  showMessage: true,
});
const slots = defineSlots();
const ctx = inject(FORM_CTX_KEY);
const errMsg = ref("");
// 存储与当前表单项关联的输入框ID数组
const inputIds = ref<string[]>([]);
const labelId = useId().value;
//记录表单项校验的状态
const validateStatus: Ref<ValidateStatus> = ref("init");
const getValByProp = (target: Record<string, any> | void) => {
  // 如果目标对象存在，且props.prop存在，且通过lodash的get方法获取的值不为null或undefined
  if (target && props.prop && !isNil(get(target, props.prop))) {
    // 返回目标对象中对应属性的值
    return get(target, props.prop);
  }
  // 否则返回null
  return null;
};
//从props或者是具名插槽中获取label内容
const hasLabel = computed(() => !!(props.label || slots.label));
const currentLabel = computed(
  () => `${props.label ?? ""}${ctx?.labelSuffix ?? ""}`
);
// 计算label的宽度
const normalizeLabelWidth = computed(() => {
  const _normalizeStyle = (val: number | string) => {
    if (isNumber(val)) return `${val}px`;
    return endsWith(val, "px") ? val : `${val}px`;
  };
  if (props.labelWidth) return _normalizeStyle(props.labelWidth);
  if (ctx?.labelWidth) return _normalizeStyle(ctx?.labelWidth);
  return "150px";
});

// 计算label的for属性值
const labelFor = computed(
  // 如果props.for存在，则使用props.for
  // 否则，如果inputIds数组不为空，则使用第一个inputId
  // 如果都没有，则返回空字符串
  () => props.for || (inputIds.value.length ? inputIds.value[0] : "")
);
//禁用状态（继承来自form的禁用）
const isDisabled = computed(() => ctx?.disabled || props.disabled);
const isRequired = computed(
  () =>
    (!ctx?.hideRequiredAsterisk && some(itemRules.value, "required")) ||
    props?.required
);
// 表单域的值
const innerVal = computed(() => {
  const model = ctx?.model;
  return getValByProp(model);
});
const propString = computed(() => {
  // 如果props.prop不存在，返回空字符串
  if (!props.prop) return "";
  // 如果props.prop是字符串类型，直接返回该字符串
  // 否则将数组类型的props.prop用点号连接成字符串(props.prop可能是数组)
  return isString(props.prop) ? props.prop : props.prop.join(".");
});
const itemRules = computed(() => {
  // 从props中解构出required属性
  const { required } = props;
  // 初始化规则数组
  const rules: FormItemRule[] = [];

  // 如果组件自身定义了rules，则添加到规则数组中
  if (props.rules) {
    rules.push(...props.rules);
  }

  // 获取表单级别的规则
  const formRules = ctx?.rules;
  // 如果存在表单级别规则且当前表单项有prop属性
  if (formRules && props.prop) {
    // 获取当前表单项对应的规则
    const _rules = getValByProp(formRules);
    // 如果存在规则，则添加到规则数组中
    if (_rules) {
      rules.push(..._rules);
    }
  }

  // 如果required属性有值（非null/undefined）
  if (!isNil(required)) {
    // 过滤出包含required属性的规则，并保留其索引
    const requiredRules = filter(
      map(rules, (rule, i) => [rule, i]),
      (item: [FormItemRule, number]) => includes(keys(item[0]), "required")
    );

    // 如果存在包含required属性的规则
    if (size(requiredRules)) {
      // 遍历这些规则
      for (const item of requiredRules) {
        const [rule, i] = item as [FormItemRule, number];
        // 如果规则中的required属性与当前required值相同，则跳过
        if (rule.required === required) continue;
        // 否则更新规则中的required属性
        rules[i] = { ...rule, required };
      }
    } else {
      // 如果不存在包含required属性的规则，则添加一个新的required规则
      rules.push({ required });
    }
  }

  // 返回最终的规则数组
  return rules;
});
let initialVal: any = null;
let isResetting: boolean = false;
//根据传入的trigger事件过滤出需要执行的规则,返回过滤后的规则数组，并移除trigger属性（async-validate包没有实现trigger选项）
function getTriggeredRules(trigger: string) {
  // 获取当前表单项的所有验证规则
  const rules = itemRules.value;
  // 如果没有规则，返回空数组
  if (!rules) return [];

  // 过滤出与当前触发事件匹配的规则
  return filter(rules, (r) => {
    // 如果规则没有定义trigger或者没有传入trigger，则默认匹配
    if (!r?.trigger || !trigger) return true;
    // 如果trigger是数组，检查是否包含当前trigger
    if (isArray(r.trigger)) {
      return r.trigger.includes(trigger);
    }
    // 否则直接比较trigger是否相等
    return r.trigger === trigger;
    // 过滤后移除trigger属性，返回纯规则对象
  }).map(({ trigger, ...rule }) => rule as RuleItem);
}
async function doValidate(rules: RuleItem[]) {
  // 获取当前表单项的属性路径字符串
  const modleName = propString.value;
  // 创建async-validator的Schema实例
  const validator = new Schema({ [modleName]: rules });
  // 执行校验
  return validator
    .validate({ [modleName]: innerVal.value }, { firstFields: true })
    .then(() => {
      // 校验成功时更新状态
      validateStatus.value = "success";
      // 触发表单的validate事件，传递成功状态
      ctx?.emits("validate", props, true, "");
      return true;
    })
    .catch((err: FormValidateFailuer) => {
      // 获取校验错误信息
      const { errors } = err;
      // 更新校验状态为错误
      validateStatus.value = "error";
      // 设置错误提示信息
      errMsg.value = errors && size(errors) > 0 ? errors[0].message ?? "" : "";
      // 触发表单的validate事件，传递失败状态和错误信息
      ctx?.emits("validate", props, false, errMsg.value);
      // 返回拒绝的Promise
      return Promise.reject(err);
    });
}
const validate: FormItemInstance["validate"] = async function (
  trigger: string, // 触发校验的事件类型
  callback?: FormValidateCallback // 校验完成后的回调函数
) {
  // 如果正在重置、没有prop属性或表单项被禁用，直接返回false
  if (isResetting || !props.prop || isDisabled.value) return false;
  // 如果当前没有校验状态，调用回调函数并返回false
  if (!validateStatus.value) {
    callback?.(false);
    return false;
  }
  // 获取与当前trigger匹配的验证规则
  const rules = getTriggeredRules(trigger);
  // 如果没有匹配的规则，调用回调函数并返回true
  if (!size(rules)) {
    callback?.(true);
    return true;
  }
  // 设置校验状态为"validating"（校验中）
  validateStatus.value = "validating";
  // 执行校验
  return doValidate(rules)
    .then(() => {
      // 校验成功，调用回调函数并返回true
      callback?.(true);
      return true;
    })
    .catch((err: FormValidateFailuer) => {
      // 获取校验失败的错误信息
      const { fields } = err;
      // 调用回调函数，传递false和错误信息
      callback?.(false, fields);
      // 返回拒绝的Promise
      return Promise.reject(fields);
    });
};
//重置当前表单项
const resetField: FormItemInstance["resetField"] = function () {
  const model = ctx?.model;
  if (model && propString.value && !isNil(get(model, propString.value))) {
    isResetting = true;
    model[propString.value] = cloneDeep(initialVal);
  }
  nextTick(() => clearValidate());
};

const clearValidate: FormItemInstance["clearValidate"] = function () {
  validateStatus.value = "init";
  errMsg.value = "";
  isResetting = false;
};
const addInputId: FormItemContext["addInputId"] = function (id) {
  if (!includes(inputIds.value, id)) inputIds.value.push(id);
};

const removeInputId: FormItemContext["removeInputId"] = function (id) {
  inputIds.value = filter(inputIds.value, (i) => i !== id);
};

// 表单项提供的上下文内容
const formItemCtx: FormItemContext = reactive({
  ...toRefs(props),
  disabled: isDisabled.value,
  validate,
  resetField,
  clearValidate,
  addInputId,
  removeInputId,
});
// 提供表单项上下文
provide<FormItemContext>(FORM_ITEM_CTX_KEY, formItemCtx);
onMounted(() => {
  if (!props.prop) return;
  //将该表单项添加到form的fields数组中
  ctx?.addField(formItemCtx);
  initialVal = innerVal.value;
});
onUnmounted(() => {
  if (!props.prop) return;
  ctx?.removeField(formItemCtx);
});
defineExpose<FormItemInstance>({
  validateMessage: errMsg,
  validateStatus,
  validate,
  resetField,
  clearValidate,
});
</script>
<template>
  <div
    class="er-form-item"
    :class="{
      'is-error': validateStatus === 'error',
      'is-disabled': isDisabled,
      'is-required': isRequired,
      'asterisk-left': ctx?.requiredAsteriskPosition === 'left',
      'asterisk-right': ctx?.requiredAsteriskPosition === 'right',
    }"
  >
    <!-- 使用动态组件实现label部分的渲染 -->
    <component
      v-if="hasLabel"
      class="er-form-item__label"
      :class="`position-${ctx?.labelPosition ?? `right`}`"
      :is="labelFor ? 'label' : 'div'"
      :id="labelId"
      :for="labelFor"
    >
      <slot name="label" :label="currentLabel">
        {{ currentLabel }}
      </slot>
    </component>
    <div class="er-form-item__content">
      <slot :validate="validate"></slot>
      <div class="er-form-item__error-msg" v-if="validateStatus === 'error'">
        <template v-if="ctx?.showMessage && showMessage">
          <slot name="error" :error="errMsg">{{ errMsg }}</slot>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import "./style.css";

.er-form-item {
  --er-form-lebel-width: v-bind(normalizeLabelWidth) !important;
}
</style>
