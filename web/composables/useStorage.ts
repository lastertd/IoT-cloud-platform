// link:https://meta.feishu.cn/wiki/CDDGwzsHMi8vbHkxBuUcEpPanAb

import type { WritableComputedRef } from "vue";
import type { StorageMap } from "~/utils";


/**
 * @description 使用storage
 * @param key
 * @param val 初始值， 如果设置此项将会在mounted阶段为存储赋值一次
 */
export const useStorage = <K extends keyof StorageMap = keyof StorageMap>(
  key: K,
  val?: StorageMap[K]
) => {
  if (!isEmpty(val)) {
    storage.set(key, val);
  }

  const valRef: WritableComputedRef<StorageMap[K]> = computed({
    get: () => storage.get(key),
    set: (val) => {
      // const old = valRef.value;
      // if (isArray(old)) {
      //   if (isArray(val)) {
      //     old.push(...val);
      //   } else old.push(val);
      //
      //   storage.set(key, old);
      //
      //   return;
      // }
      storage.set(key, val);
    }
  });

  return valRef;
};
