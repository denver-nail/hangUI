import { computed, ref } from "vue";
const zIndex = ref(0);
//处理zIndex的逻辑
export default function useZIndex(initVal = 2000) {
  const _initVal = ref(initVal);
  const currentZIndex = computed(() => {
    return zIndex.value + _initVal.value;
  });
  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };
  return {
    initvalValue: _initVal,
    currentZIndex,
    nextZIndex,
  };
}
