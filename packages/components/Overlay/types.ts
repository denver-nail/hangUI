export interface OverlayProps {
  mask?: boolean; // 是否显示遮罩层（可选）
  zIndex?: number; // 层级控制（可选）
  overlayClass?: string | string[] | Record<string, boolean>; // 自定义类名（支持多种格式）
}

export interface OverlayEmits {
  (e: "click", value: MouseEvent): void; // 点击事件回调（当遮罩层被点击时触发）
}
