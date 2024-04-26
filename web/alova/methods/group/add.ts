import { alovaInstance, type ResponseType } from "~/alova";
import { withMeta } from "~/alova/withMeta";

// link:

interface GroupAddOptions {
  name: string;
  description: string;
}

/**
 * @description -
 */
export const groupAddApi = (body: GroupAddOptions, params?: object, headers?: object) => {
  return withMeta(
    alovaInstance.Post<ResponseType<string>, GroupAddOptions>(`/group/add`, body, {
      params,
      headers: {
        ...headers,
        "Content-Type": "application/json"
      }
    }),
    {
      popupAuth: true
    }
  );
};
