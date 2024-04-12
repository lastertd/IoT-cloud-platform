import { alovaInstance } from "../../getAlovaInstance";
import type { ResponseType } from "../../type";

// link:https://mock.metaapp.cn/project/132/interface/api/48297

/** 自助账号找回 - 忘记账号 ：body参数 */
export interface forgetAccountOption {
  /** 找回类型 */
  retrieveType: "thirdPayNo" | "eggParty";
  /** 找回value */
  retrieveValue: string;
}

/** 自助账号找回 - 忘记账号 ：返回值 */
export interface forgetAccountResult
  extends ResponseType<string, [38500, 200200, 400, 778811, 778800]> {}

/**
 * @description 自助账号找回 - 忘记账号
 */
export const forgetAccountApi = (body: forgetAccountOption, params?: object, headers?: object) => {
  return alovaInstance.Post<forgetAccountResult, forgetAccountOption>(
    `/user/retrieve/v1/number/retrieve`,
    body,
    {
      params,
      headers: {
        ...headers,
        "Content-Type": "application/json"
      }
    }
  );
};
