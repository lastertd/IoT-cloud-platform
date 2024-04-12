import type { integer } from "vscode-languageserver-types";
import { alovaInstance } from "../../getAlovaInstance";
import type { ResponseType } from "../../type";

export interface payChannelApiOption {
  /** 捆绑包id */
  bundleId: string;
  /** 支付场景code */
  sceneCode: string;
  /** 游戏code */
  gameCode?: string;
}

console.log();

export interface payChannelApiResult
  extends ResponseType<{
    /* 是否允许帮付 */
    helpPay?: boolean;
    /* 支付通道列表 */
    channelList?: integer[];
    channelShowList?: {
      /* 支付通道 */
      channel?: integer;
      /* 展示内容， 可能是badge */
      content?: string;
      /* 背景颜色 */
      backColor?: string;
    }[];
  }> {}

/**
 * 获取页面中枢对应url
 * @param body
 * @param params
 * @param headers
 * @returns
 */
export const payChannelApi = (body: payChannelApiOption, params?: object, headers?: object) => {
  return alovaInstance.Post<payChannelApiResult, payChannelApiOption>(
    `payment/v1/channel/helppay`,
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
