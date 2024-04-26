/** 任意函数 */
export type AnyFunction<T = any> = (...args: any[]) => T;

/** 构造函数 */
export type AnyConstructor = new (...args: any[]) => any;

/** 假值类型 */
export type Falsy = false | "" | 0 | null | undefined;

// 原始类型：不包括不常用的 symbol 和 bigint
export type Primitive = string | number | boolean | undefined;

/** 校验错误消息类型 */
export type ValidateErrorMessage = Array<{
  field: string;
  message: Array<string>;
}>;

export type MsgType = "attr" | "cmd";
