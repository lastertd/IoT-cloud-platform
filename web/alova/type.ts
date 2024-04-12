/** 服务端通用响应 */
export interface ResponseType<Data, Code extends number[] = number[]> {
  code: Code[number] | 200;
  message: string;
  data: Data;
}
