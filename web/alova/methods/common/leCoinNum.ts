import type { integer } from "vscode-languageserver-types";
import { alovaInstance } from "../../getAlovaInstance";
import type { ResponseType } from "../../type";

export interface leCoinNumApiOption {
  /** 类型 */
  coinType: number;
}


export interface leCoinNumApiResult
  extends ResponseType<{
    /* 乐币数 */
    leCoinNum: number;
    /* 乐币基本账户余额 */
    leCoinBaseNum: integer;
    /* 乐币赠送账户余额 */
    leCoinAwardNum: integer;
  }> {}

/**
 * 获取页面中枢对应url
 * @param body
 * @param params
 * @param headers
 * @returns
 */
export const leCoinNumApi = (body: leCoinNumApiOption, params?: object, headers?: object) => {
  return alovaInstance.Post<leCoinNumApiResult, leCoinNumApiOption>(
    `/lecoin/v1/lecoin/user/balance`,
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
