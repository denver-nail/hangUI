import { isFunction } from "lodash-es";
import { defineComponent } from "vue";

//定义项目中通用图标的类型-图标名的映射
export const typeIconMap = new Map([
  ["info", "circle-info"],
  ["success", "check-circle"],
  ["warning", "circle-exclamation"],
  ["danger", "circle-xmark"],
  ["error", "circle-xmark"],
]);

/**
 * 定义一个 Vue 组件，用于渲染虚拟节点。
 * 此组件接收一个 vnode 属性，该属性可以是字符串、对象或函数。
 * 如果 vnode 是函数，则调用该函数并返回其结果；否则，直接返回 vnode。
 */
export const RenderVnode = defineComponent({
  /**
   * 组件的属性定义。
   * @property {string | object | function} vnode - 要渲染的虚拟节点，可以是字符串、对象或函数。
   * @property {boolean} required - 表示该属性是必需的。
   */
  props: {
    vNode: {
      // vnode 属性的类型可以是字符串、对象或函数
      type: [String, Object, Function],
      // vnode 属性是必需的
      required: true,
    },
  },
  setup(props) {
    // 如果 vnode 是函数，则调用该函数；否则直接返回 vnode
    return () => (isFunction(props.vNode) ? props.vNode() : props.vNode);
  },
});

//导出install.ts 所有方法
export * from "./install";
//导出error.ts 所有方法
export * from "./error";
//导出style.ts 所有方法
export * from "./style";
