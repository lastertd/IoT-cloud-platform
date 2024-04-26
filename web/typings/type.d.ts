/** 任意函数 */
export type AnyFunction<T = unknown> = (...args: any[]) => T;

/** 构造函数 */
export type AnyConstructor = new (...args: any[]) => any;

/** 假值类型 */
export type Falsy = false | "" | 0 | null | undefined;

// 原始类型：不包括不常用的 symbol 和 bigint
export type Primitive = string | number | boolean | undefined;
