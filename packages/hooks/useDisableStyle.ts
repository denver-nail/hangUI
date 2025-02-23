//主要作用在Dropdown组件，由于在使用Dropdown组件时展示的内容是通过slot传入的，但是对于整个组件的disable的控制在组件的根节点上，所以需要使用该hooks去遍历DOM树去查找目标节点，并为其添加disabled相关的样式和行为控制。
import { each, isFunction, cloneDeep, assign } from "lodash-es";
import { watchEffect, useSlots, getCurrentInstance, type VNode } from "vue";

// 深度遍历节点，并对每个节点执行回调函数
const _dfs = (nodes: VNode[], cb: (node: VNode) => void) =>
  each(nodes, (node) => {
    isFunction(cb) && cb(node); // 如果回调函数是有效的，执行回调
    node.children && _dfs(node.children as VNode[], cb); // 如果节点有子节点，递归遍历
  });

// 自定义hooks，用于根据disabled属性控制Dropdown组件的样式
export function useDisabledStyle() {
  const nodePropsMap = new Map(); // 存储节点的原始属性，以便禁用时恢复

  const instance = getCurrentInstance()!; // 获取当前组件实例
  const children = useSlots()?.default?.(); // 获取slot传入的内容（Dropdown的显示内容）

  // 监听依赖变化，在组件的disabled状态变化时，自动修改子节点样式
  watchEffect(() => {
    // 如果当前实例没有禁用（disabled为false）
    if (!instance.props?.disabled) {
      // 遍历子节点，恢复原始的节点属性
      _dfs(children ?? [], (node) => {
        if (!nodePropsMap.has(node)) return;
        node.props = nodePropsMap.get(node); // 恢复原始props
      });
      return;
    }

    // 如果禁用状态为true，禁用所有子节点，设置禁用样式
    _dfs(children ?? [], (node) => {
      if (!node?.props) return;

      // 存储当前节点的原始props，以便以后恢复
      nodePropsMap.set(node, cloneDeep(node.props));

      // 修改节点的props，添加禁用样式
      node.props = assign(node?.props, {
        style: {
          cursor: "not-allowed", // 禁用时，鼠标指针变为不可点击状态
          color: "var(--er-text-color-placeholder)", // 禁用时，文本颜色变为灰色
        },
      });
    });
  });
}

export default useDisabledStyle;
