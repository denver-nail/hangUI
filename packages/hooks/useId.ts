// 生成唯一id
import { type Ref, computed } from "vue";
const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0,
};
export function useId(namespace: string = "h"): Ref<string> {
  const idRef = computed(
    () =>
      `${namespace}-${
        defaultIdInjection.prefix
      }-${defaultIdInjection.current++}`
  );
  return idRef;
}
export default useId;
