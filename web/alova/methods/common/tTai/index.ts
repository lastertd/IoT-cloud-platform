import { alovaInstance } from "../../../getAlovaInstance";
import type { tTaiResultTemplate } from "./type";

// link:https://mock.metaapp.cn/project/206/interface/api/6164

export * from "./type";

export interface tTaiOptions {
  resourceId: number;
}

/**
 * @description 自助账号找回 - 忘记账号
 */
export const tTaiApi = <R extends tTaiResultTemplate>(params?: tTaiOptions, headers?: object) => {
  return alovaInstance.Get<R, tTaiOptions>(`ttai/v1/item/get`, {
    params,
    headers
  });
};
