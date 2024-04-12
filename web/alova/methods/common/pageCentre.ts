import { alovaInstance } from "../../getAlovaInstance";
import type { ResponseType } from "../../type";

export interface pageCentreApiOption {
  codeList: number[];
}

export interface pageCentreApiResult
  extends ResponseType<
    {
      code: number;
      /** "2022-06-06 11:08:20" */
      createTime: string;
      id: number;
      tag: string;
      title: string;
      /** "2023-02-21 10:23:42" */
      updateTime: string;
      url: string;
    }[]
  > {}

/**
 * 获取页面中枢对应url
 * @param body
 * @param params
 * @param headers
 * @returns
 */
export const pageCentreApi = (body: pageCentreApiOption, params?: object, headers?: object) => {
  return alovaInstance.Post<pageCentreApiResult, pageCentreApiOption>(
    `protocol/v1/query/batch`,
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
