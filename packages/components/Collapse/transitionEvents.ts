/* 定义了一些实用的函数和一个 transitionEvents 对象，用来管理网页中元素的 CSS 动画过渡，主要用于实现可折叠或可展开元素（比如手风琴组件或下拉菜单）的动画效果。 */
// 元素的 height 样式设置为 0px
const _setHeightZero = (el: HTMLElement) => (el.style.height = "0px");
//元素的 height 设置为元素的 scrollHeight，即元素的实际高度（包括滚动内容的高度）。在展开动画时使用，确保元素的高度适应其内容的大小。
const _setHeightScroll = (el: HTMLElement) =>
  (el.style.height = `${el.scrollHeight}px`);
//这个函数将元素的 height 样式清空，恢复元素的默认高度设置
const _setHeightEmpty = (el: HTMLElement) => (el.style.height = "");
//这个函数将元素的 overflow 样式设置为 hidden，通常用于动画过渡前，防止内容溢出。
const _setOverflowHidden = (el: HTMLElement) => (el.style.overflow = "hidden");
//这个函数将元素的 overflow 样式清空，恢复默认的溢出设置。
const _setOverflowEmpty = (el: HTMLElement) => (el.style.overflow = "");

//过渡样式的设置
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    _setHeightZero(el);
    _setOverflowHidden(el);
  },
  enter: (el) => _setHeightScroll(el),
  afterEnter(el) {
    _setHeightEmpty(el);
    _setOverflowEmpty(el);
  },
  beforeLeave(el) {
    _setHeightScroll(el);
    _setOverflowHidden(el);
  },
  leave: (el) => _setHeightZero(el),
  afterLeave(el) {
    _setHeightEmpty(el);
    _setOverflowEmpty(el);
  },
};

export default transitionEvents;
