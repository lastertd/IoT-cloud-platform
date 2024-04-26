import { alovaInstance, type Group, type ResponseType } from "~/alova";

// link:

interface DevicesGetAllOptions {
  groupId: Group["id"];
}

/**
 * @description -
 */
export const devicesGetAllApi = (params?: DevicesGetAllOptions, headers?: object) => {
  return alovaInstance.Get<ResponseType<any>, DevicesGetAllOptions>(`/devices`, {
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
