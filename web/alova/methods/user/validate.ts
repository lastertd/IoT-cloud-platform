import { alovaInstance, type ResponseType } from "~/alova";

// link:

interface UserValidateOptions {
  uid: string;
}

/**
 * @description -
 */
export const userValidateApi = (params?: UserValidateOptions, headers?: object) => {
  return alovaInstance.Get<ResponseType<any>, UserValidateOptions>(`/user/validate`, {
    params,
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  });
};
