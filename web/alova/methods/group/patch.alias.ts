import { alovaInstance, type ResponseType } from "~/alova";

// link:

interface GroupPatchAliasOptions {
  alias: string;
  groupId: string;
}

/**
 * @description -
 */
export const groupPatchAliasApi = (
  body: GroupPatchAliasOptions,
  params?: object,
  headers?: object
) => {
  return alovaInstance.Post<ResponseType<boolean>, GroupPatchAliasOptions>(
    `/group/patchAlias`,
    body,
    {
      params,
      headers: {
        ...headers,
        "Content-Type": "application/json"
      }
    }
  );
};
