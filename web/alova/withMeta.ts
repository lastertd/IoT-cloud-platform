import type { Method } from "alova";

export interface AlovaMeta {
  [k: string]: unknown;

  /** 获取整个请求的所有权 */
  resAll: boolean;
  /** 获取整个后端数据的所有权 */
  resBussines: boolean;
}

/**
 * @description 给接口method 添加上自定义元数据
 */
export const withMeta = (method: Method, options?: AlovaMeta) => {
  method.meta = {
    ...options
  };

  return method;
};
