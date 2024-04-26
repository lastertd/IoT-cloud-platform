import { createAlova } from "alova";
import VueHook from "alova/vue";
import GlobalFetch from "alova/GlobalFetch";
import { getConfig } from "@/utils";
import { type ResponseType } from "@/alova";

/**
 * @description 这里配置请求应该设置的请求头
 */
const getHeaders = () => {
  return {
    selfPackageName: "com.meta.box",
    authorization: JSON.parse(localStorage.getItem("user") ?? "{}").token
  };
};

/**
 * @description 对于响应的处理不统一
 */
export const alovaInstance = createAlova({
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  baseURL: getConfig().baseUrl,
  beforeRequest: (method) => {
    Object.assign(method.config.headers, getHeaders());
  },
  responded: {
    onSuccess: async (response, method) => {
      const data = await response.json();
      const resData = data as ResponseType<any>;

      // solve popup
      if (method.meta?.popupAuth) {
        if (response.status >= 300 || response.status < 200) {
          ElNotification({
            title: "title",
            message: resData.message,
            type: method.meta?.popupType ?? "warning",
            offset: 50
          });

          // throw new Error(resData.message);
        }
      }

      return resData;
    },
    onError: (error) => {
      throw error;
    }
  }
});
