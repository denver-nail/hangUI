import type {
  RuleItem,
  ValidateError,
  ValidateFieldsError,
} from "async-validator";
import type { Ref } from "vue";

// 扩展async-validator的RuleItem接口，添加trigger属性
export interface FormItemRule extends RuleItem {
  trigger?: string | string[];
}

// 定义表单规则类型，键为字段名，值为规则数组
export type FormRules = Record<string, FormItemRule[]>;

// 表单验证结果类型，返回一个Promise<boolean>
export type FormValidateResult = Promise<boolean>;

// 表单验证回调函数类型
export type FormValidateCallback = (
  isValid: boolean,
  invalidFields?: ValidateFieldsError
) => void;

// 验证状态类型
export type ValidateStatus = "success" | "error" | "init" | "validating";

// 表单验证失败时的数据结构
export interface FormValidateFailuer {
  errors?: ValidateError[];
  fields: ValidateFieldsError;
}

// 表单组件的Props接口
export interface FormProps {
  model: Record<string, any>; // 表单数据对象
  rules?: FormRules; // 验证规则
  disabled?: boolean; // 是否禁用
  labelWidth?: number | string; // 标签宽度
  labelPosition?: "left" | "right" | "top"; // 标签位置
  labelSuffix?: string; // 标签后缀
  showMessage?: boolean; // 是否显示验证信息
  hideRequiredAsterisk?: boolean; // 是否隐藏必填星号
  requiredAsteriskPosition?: "left" | "right"; // 必填星号位置
}

// 表单组件的事件接口
export interface FormEmits {
  (
    event: "validate",
    prop: FormItemProps,
    isValid: boolean,
    message: string
  ): void;
}

// 表单项组件的Props接口
export interface FormItemProps {
  prop?: string | string[]; // 字段名
  label?: string; // 标签文本
  for?: string; // 关联的input id
  labelWidth?: number | string; // 标签宽度
  disabled?: boolean; // 是否禁用
  required?: boolean; // 是否必填
  showMessage?: boolean; // 是否显示验证信息
  error?: string; // 自定义错误信息
  rules?: FormItemRule[]; // 验证规则
}

// 表单实例接口
export interface FormInstance {
  validate(callback?: FormValidateCallback): FormValidateResult; // 验证整个表单
  validateField(
    keys?: string[],
    callback?: FormValidateCallback
  ): FormValidateResult; // 验证指定字段
  resetFields(keys?: string[]): void; // 重置表单
  clearValidate(keys?: string[]): void; // 清除验证状态
}

// 表单项实例接口
export interface FormItemInstance {
  validateStatus: Ref<ValidateStatus>; // 验证状态
  validateMessage: Ref<string>; // 验证信息
  validate(
    trigger: string,
    callback?: FormValidateCallback
  ): FormValidateResult; // 验证当前项
  resetField(): void; // 重置当前项
  clearValidate(): void; // 清除当前项验证状态
}

// 表单上下文接口，继承FormProps
export interface FormContext extends FormProps {
  emits: FormEmits; // 事件发射器
  addField(field: FormItemContext): void; // 添加表单项
  removeField(field: FormItemContext): void; // 移除表单项
}

// 表单项上下文接口，继承FormItemProps
export interface FormItemContext extends FormItemProps {
  validate(
    trigger: string,
    callback?: FormValidateCallback
  ): FormValidateResult; // 验证当前项
  resetField(): void; // 重置当前项
  clearValidate(): void; // 清除当前项验证状态
  addInputId(id: string): void; // 添加input id
  removeInputId(id: string): void; // 移除input id
}
