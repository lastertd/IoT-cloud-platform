import type { Method } from "alova";

export interface AlovaMeta {
  [k: string]: unknown;

  popupAuth?: boolean;
  popupType?: "success" | "warning" | "info";
}

/**
 * @description 给接口method 添加上自定义元数据
 */
export const withMeta = <T extends Method>(method: T, options?: AlovaMeta): T => {
  method.meta = {
    ...options
  };

  return method;
};
