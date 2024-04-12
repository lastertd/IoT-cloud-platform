import { alovaInstance } from "../../getAlovaInstance";
import type { ResponseType } from "../../type";
import type { forgetPswdResult } from "~/233/alova";

// link:https://mock.metaapp.cn/project/132/interface/api/48305

export interface resetPswdOption {
  /** key  */
  retrieveKey: forgetPswdResult["data"]["retrieveKey"];
  /** 新密码 */
  newPassward: string;
  /** 用户号 */
  userNumber: string;
}

export interface resetPswdResult extends ResponseType<boolean, [1014]> {}

/**
 * @description 自助账号找回 - 忘记密码服务
 */
export const resetPswdApi = (body: resetPswdOption, params?: object, headers?: object) => {
  return alovaInstance.Post<resetPswdResult, resetPswdOption>(`/user/retrieve/v1/psw/reset`, body, {
    params,
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  });
};
