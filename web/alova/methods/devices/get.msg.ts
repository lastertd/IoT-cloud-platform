import { alovaInstance, type Devices, type Message, type ResponseType } from "~/alova";

// link:

interface DevicesGetMsgOptions {
  devicesId: Devices["id"];
}

/**
 * @description -
 */
export const devicesGetMsgApi = (params?: DevicesGetMsgOptions, headers?: object) => {
  return alovaInstance.Get<ResponseType<Message[]>, DevicesGetMsgOptions>(`/devices/getMsgInfo`, {
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
