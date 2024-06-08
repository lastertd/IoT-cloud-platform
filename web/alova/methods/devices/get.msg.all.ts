import { alovaInstance, type Devices, type ResponseType, type Message } from "~/alova";

// link:

interface DevicesGetMsgAllOptions {
  devicesId: Devices["id"];
  page: number;
}

/**
 * @description -
 */
export const devicesGetMsgAllApi = (params?: DevicesGetMsgAllOptions, headers?: object) => {
  return alovaInstance.Get<ResponseType<Message[]>, DevicesGetMsgAllOptions>(`/devices/getMsg`, {
    params,
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  });
};
