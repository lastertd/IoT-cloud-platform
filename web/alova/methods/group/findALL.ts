import { alovaInstance } from "~/alova";
import type { Group, ResponseType } from "~/alova";

// link:

interface GroupFindAllOptions {}

interface GroupFindAllResult extends ResponseType<Array<Group>> {}

/**
 * @description -
 */
export const groupFindALLApi = (params?: GroupFindAllOptions, headers?: object) => {
  return alovaInstance.Get<GroupFindAllResult, GroupFindAllOptions>(`/group`, {
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
