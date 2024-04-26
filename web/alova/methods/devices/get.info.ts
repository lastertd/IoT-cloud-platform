import { alovaInstance, type Devices, type ResponseType } from "~/alova";

// link:

interface DevicesGetInfoOptions {
  devicesId: Devices["id"];
}

/**
 * @description -
 */
export const devicesGetBaseInfoApi = (params?: DevicesGetInfoOptions, headers?: object) => {
  return alovaInstance.Get<ResponseType<Devices>, DevicesGetInfoOptions>(`/devices/getBaseInfo`, {
    params,
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    localCache: {
      expire: 0
    }
  });
};
