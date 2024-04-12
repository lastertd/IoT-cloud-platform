import { createAlova, type AlovaOptions } from "alova";
import VueHook from "alova/vue";
import type { FetchRequestInit } from "alova/GlobalFetch";
import GlobalFetch from "alova/GlobalFetch";
import { mockAdapter } from "./mocks";
import type { ResponseType } from "./type";

/**
 * @description 这里配置请求应该设置的请求头
 */
const getHeaders = () => {
  return {
    ...bp(),
    selfPackageName: "com.meta.box"
  };
};

/**
 * @deprecated 对于响应的处理不统一
 */
export const alovaInstance = createAlova({
  statesHook: VueHook,
  requestAdapter: mockAdapter,
  baseURL: useConfig().baseUrl,
  beforeRequest: (method) => {
    Object.assign(method.config.headers, getHeaders());
  },
  responded: {
    onSuccess: async (response, method) => {
      if (response.status >= 300 || response.status < 200) {
        const res = `网络错误: code: ${response.status}; message: ${response.statusText}`;
        throw new Error(res);
      }
      const body = await response.json();
      if (body.status === 200) {
        return body.body;
      }
      return body;
    },
    onError: (error) => {
      throw error;
    }
  }
});

const respondedDeal: AlovaOptions<
  globalThis.Ref<unknown>,
  globalThis.Ref<unknown>,
  FetchRequestInit,
  Response,
  Headers
> = {
  statesHook: VueHook,
  requestAdapter: useConfig().mode === "development" ? mockAdapter : GlobalFetch(),
  baseURL: useConfig().baseUrl,
  beforeRequest: (method) => {
    Object.assign(method.config.headers, getHeaders());
  },
  responded: {
    onSuccess: async (response, method) => {
      if (method.meta?.resAll === true) {
        return response;
      }

      // 以下为业务相关
      if (response.status >= 300 || response.status < 200) {
        const res = `网络错误: code: ${response.status}; message: ${response.statusText}`;
        throw new Error(res);
      }

      const data = await response.json();
      const resData = data as ResponseType<any>;

      if (method.meta?.resBussines === true) {
        return resData;
      }

      if (resData.code !== 200) {
        console.warn("这里可以加入弹窗提醒");
        throw new Error(resData.message);
      }

      return resData.data;
    },
    onError: (error) => {
      throw error;
    }
  }
};

export const alovaBase = createAlova(respondedDeal);
export const alovaTest = createAlova({
  ...respondedDeal,
  baseURL: "https://test1010-api.233lyly.com/"
});
