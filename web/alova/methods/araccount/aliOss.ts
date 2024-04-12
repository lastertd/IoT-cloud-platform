import OSS from "ali-oss";
import { alovaInstance } from "../../getAlovaInstance";
import type { ResponseType } from "../../type";

// link:https://mock.metaapp.cn/project/132/interface/api/48313

export interface getTokensOptions {
  /** 文件名列表 */
  requests: string[];
}

export interface getTokensResults
  extends ResponseType<
    {
      securityToken: string;
      accessKeySecret: string;
      accessKeyId: string;
      endPointDomain: string;
      regionName: string;
      bucket: string;
      key: string;
      domain: string;
      validDuration: number;
      startTime: number;
      expiration: number;
      protocol: string;
      url: string;
      supplierType: number;
    }[]
  > {}

/**
 * @description ali-oss 获取token
 */
const getTokens = (body: getTokensOptions, params?: object, headers?: object) => {
  console.log("/storage/getTokens", body);
  return alovaInstance.Post<getTokensResults, getTokensOptions>(
    `/storage/getTokens`,
    {
      ...body,
      bizCode: "order-invoice-temp",
      prefix: ""
    },
    {
      params,
      headers: {
        ...headers,
        "Content-Type": "application/json"
      }
    }
  );
};

export const aliOssApi = {
  getTokens
};
