import { alovaInstance } from "~/alova";
import type { DevicesCnt, Group, ResponseType } from "~/alova";

// link:

interface GroupGetInfoOptions {
  groupId?: string;
}

export interface GroupGetInfoResult
  extends ResponseType<{
    group: Group;
    devices: DevicesCnt;
    message: {
      cnt: number;
    };
  }> {}

/**
 * @description -
 */
export const groupGetInfoApi = (body: GroupGetInfoOptions, params?: object, headers?: object) => {
  return alovaInstance.Post<GroupGetInfoResult, GroupGetInfoOptions>(`/group/getInfo`, body, {
    params,
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  });
};
