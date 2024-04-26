import { alovaInstance, type ResponseType } from "@/alova";
import { withMeta } from "~/alova/withMeta";

export interface UserRegisterOption {
  name: string;
  contact: string;
  password: string;
}

export const userRegisterApi = (body: UserRegisterOption, params?: object, headers?: object) => {
  return withMeta(
    alovaInstance.Post<ResponseType<string>, UserRegisterOption>(`/user/register`, body, {
      params,
      headers: {
        ...headers,
        "Content-Type": "application/json"
      }
    }),
    { popupAuth: true }
  );
};
