import type { ResponseType } from "~/233/alova/type";

export type tTaiResultTemplate<VALUE = unknown> = ResponseType<{
  id?: number;
  dataType?: string;
  value?: VALUE;
}>;

// 不同的资源ID，不同返回参数
export type tTaiResult233010 = tTaiResultTemplate<"true" | "false">;
