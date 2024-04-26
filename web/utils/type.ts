/*
  常用的一些判断类型的函数
 */

/**
 * @description 是否是undefined
 */
export const isUndefined = (val: unknown): val is undefined => {
  // eslint-disable-next-line no-void
  return val === void 0;
};
/**
 * @description 是否是boolean
 */
export const isBoolean = (val: unknown): val is boolean => typeof val === "boolean";
/**
 * @description 是否是数字
 */
export const isNumber = (val: unknown): val is number => typeof val === "number";
/**
 * @description 是否是数组
 */
export const isArray = <T = unknown>(val: unknown): val is Array<T> => Array.isArray(val);
/**
 * @description 是否是方法
 */
export const isFunction = (val: unknown): val is Function => typeof val === "function";

/**
 * @description 是否是空值
 */
export const isEmpty = (val: unknown): val is undefined | null => val === undefined || val === null;

/**
 * @description 是否是空字符串
 */
export const isEmptyString = (val: unknown): boolean => val === "" || isEmpty(val);

/**
 * @description 是否是字符串
 */
export const isString = (val: unknown): val is string => typeof val === "string";
/**
 * @description 是否是dom节点
 */
export const isHTMLElement = (e: unknown): e is HTMLElement => e instanceof HTMLElement;

/**
 * @description 是否是Element
 */
export const isElement = (e: unknown): e is Element => e instanceof Element;

/**
 * @description 是否是正则表达式
 */
export const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp;
/**
 * @description 空函数
 */
export const noop = () => undefined;
