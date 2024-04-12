import { alovaInstance } from "../../getAlovaInstance";
import type { ResponseType } from "../../type";

// link:https://mock.metaapp.cn/project/132/interface/api/48081

export interface getHistoryAccountOption {}

export interface Account {
  /** 用户头像 */
  avatar?: string;
  /** 设备id */
  deviceId?: string;
  /** 登录内容 */
  loginContent?: string;
  /** 登录类型: QQ, UNIONID(微信), PHONE, ONLYID(游客), ACCOUNT(账密), APPLE */
  loginType?: "QQ" | "UNIONID" | "PHONE" | "ONLYID" | "ACCOUNT" | "APPLE";
  /** 233号 */
  metaNumber?: string;
  /** 用户昵称 */
  nickname?: string;
  /** 用户uuid */
  uuid?: string;
  /** 消息描述 */
  message?: string;
}

export interface getHistoryAccountResult
  extends ResponseType<Account[], [38500, 200200, 400, 778811, 778800]> {}

/**
 * @description 自助账号找回 - 忘记账号 构造post请求
 */
export const getHistoryAccountApi = (params?: getHistoryAccountOption, headers?: object) => {
  return alovaInstance.Get<getHistoryAccountResult, getHistoryAccountOption>(
    `/user/v1/device/login/history`,
    {
      params,
      headers: {
        ...headers,
        "Content-Type": "application/json"
      }
    }
  );
};
