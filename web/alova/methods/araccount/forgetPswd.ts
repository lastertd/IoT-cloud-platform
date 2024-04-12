import { alovaInstance } from "../../getAlovaInstance";
import type { ResponseType } from "../../type";

// link:https://mock.metaapp.cn/project/132/interface/api/48321

export interface forgetPswdOption {
  /** 身份证证件名称 */
  cardName: string;
  /** 身份证证件号 */
  cardNo: string;
  /** 用户号 */
  userNumber: string;
}

export interface forgetPswdResult
  extends ResponseType<
    {
      /** 支付订单数量 */
      payOrderNumber: number;
      /** 找回的key, 可以理解为token临时凭证 */
      retrieveKey: string;
      /** 三方绑定类型 当用户有其他三方绑定时，返回，目前仅有绑定时，无法进行验证时返回该信息 */
      thirdBindType: "OPENID" | "UNIONID" | "QQ" | "APPLE" | "PHONE";
      /** 三方绑定信息 当用户有其他三方绑定时，返回，目前仅有绑定时，无法进行验证时返回该信息 */
      thirdBindValue: string;
    },
    [1015 | 1016 | 1100 | 3307_006 | 1099 | 1018 | 3307_557]
  > {}

/**
 * @description 自助账号找回 - 忘记密码服务 构造post请求
 */
export const forgetPswdApi = (body: forgetPswdOption, params?: object, headers?: object) => {
  return alovaInstance.Post<forgetPswdResult, forgetPswdOption>(
    `/user/retrieve/v1/psw/validate`,
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
