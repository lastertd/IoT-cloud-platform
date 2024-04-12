import { alovaInstance } from "../../getAlovaInstance";
import type { ResponseType } from "../../type";
import type { forgetPswdResult } from "./forgetPswd";

// link:https://mock.metaapp.cn/project/132/interface/api/48313

export interface forgetPswdValidateOption {
  /** key  */
  retrieveKey: forgetPswdResult["data"]["retrieveKey"];
  /** 验证类型 thirdPayNo 三方支付订单号、cardImage 证件图片 */
  validateType?: "thirdPayNo" | "cardImage";
  /** 验证附加值1: 订单号、证件正面 */
  validateValueOne: string;
  /** 验证附加值2: 订单号、证件反 */
  validateValueTwo: string;
}

export interface forgetPswdValidateResult
  extends ResponseType<
    {
      /** 找回的key, 可以理解为token临时凭证 */
      retrieveKey: string;
    },
    [1014, 3307006, 3307555, 3307556]
  > {}

/**
 * @description 自助账号找回 - 忘记密码服务 构造post请求
 */
export const forgetPswdValidateApi = (
  body: forgetPswdValidateOption,
  params?: object,
  headers?: object
) => {
  return alovaInstance.Post<forgetPswdValidateResult, forgetPswdValidateOption>(
    `/user/retrieve/v1/psw/revalidate`,
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
