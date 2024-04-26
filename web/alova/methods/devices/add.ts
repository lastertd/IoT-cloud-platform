import type { Group, ResponseType, Devices } from "~/alova";
import { alovaInstance } from "~/alova";

// link:

interface DevicesAddOptions {
  groupId: Group["id"];

  name: Devices["name"];

  symbol: Devices["symbol"];

  type: Devices["type"];

  description: Devices["description"];
}

/**
 * @description -
 */
export const devicesAddApi = (body: DevicesAddOptions, params?: object, headers?: object) => {
  return alovaInstance.Post<ResponseType<any>, DevicesAddOptions>(`/devices/add`, body, {
    params,
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  });
};
