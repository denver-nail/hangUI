import { type Ref, computed } from "vue";
interface UseOffsetOptions {
  offset: number;
  boxHeight: Ref<number>;
  getLastBottomOffset(): number;
}

interface UseOffsetResult {
  topOffset: Ref<number>;
  bottomOffset: Ref<number>;
}
//计算偏移量
export function useOffset(options: UseOffsetOptions): UseOffsetResult {
  const { offset, boxHeight, getLastBottomOffset } = options;
  const lastBottomOffset = computed(() => getLastBottomOffset());
  const topOffset = computed(() => {
    return lastBottomOffset.value + offset;
  });
  const bottomOffset = computed(() => {
    return topOffset.value + boxHeight.value;
  });
  return {
    topOffset,
    bottomOffset,
  };
}
export default useOffset;
