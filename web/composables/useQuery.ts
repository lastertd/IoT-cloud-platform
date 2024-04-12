// link:https://meta.feishu.cn/wiki/Wk36w3gogiF6HFk9tS8cQoRjnGc

import type { Ref } from "vue";

/**
 * @description 获取路由参数
 * @param {string} query --
 * @param {any} dft 默认值，默认值在set up阶段就会赋值上
 */
export const useQuery = <T = string>(query: string, dft?: T) => {
  const route = useRoute();
  const resRef = ref<T>() as Ref<T>;

  if (!isEmpty(dft)) {
    resRef.value = dft;
  }

  onMounted(() => {
    const __ = route.query[query] as T;

    if (!isEmpty(__)) {
      resRef.value = __;
    }

    // 默认值类型为number，则ref.value转化为number
    if (typeof dft === "number") {
      resRef.value = Number.parseInt(resRef.value as any) as T;
    }
  });

  return resRef;
};
