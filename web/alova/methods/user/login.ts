import { alovaInstance, type ResponseType } from "@/alova";
import { withMeta } from "~/alova/withMeta";

interface UserLoginOptions {
  contactOrName: string;
  password: string;
}

/**
 * @description -
 */
export const userLoginApi = (body: UserLoginOptions, params?: object, headers?: object) => {
  return withMeta(
    alovaInstance.Post<ResponseType<{ token: string }>, UserLoginOptions>(`/user/login`, body, {
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
