/*
  常用的一些判断类型的函数
 */

import type { AnyFunction } from "@metaapp/types";

/**
 * @description 是否是undefined
 * @returns {boolean} nothing
 * @param val {any} anything
 */
export const isUndefined = (val: unknown): val is undefined => {
  // eslint-disable-next-line no-void
  return val === void 0;
};
/**
 * @description 是否是boolean
 * @returns {boolean} nothing
 * @param val {any} anything
 */
export const isBoolean = (val: unknown): val is boolean => typeof val === "boolean";
/**
 * @description 是否是数字
 * @returns {boolean} nothing
 * @param val {any} anything
 */
export const isNumber = (val: unknown): val is number => typeof val === "number";
/**
 * @description 是否是数组
 * @returns {boolean} nothing
 * @param val {any} anything
 */
export const isArray = (val: unknown): val is Array<any> => Array.isArray(val);
/**
 * @description 是否是方法
 * @returns {boolean} nothing
 * @param val {any} anything
 */
export const isFunction = (val: unknown): val is AnyFunction => typeof val === "function";

/**
 * @description 是否是空值
 * @returns {boolean} nothing
 * @param val {any} anything
 */
export const isEmpty = (val: unknown): val is undefined | null => val === undefined || val === null;

/**
 * @description 是否是空字符串
 * @returns {boolean} nothing
 * @param val {any} anything
 */
export const isEmptyString = (val: unknown): boolean => val === "" || isEmpty(val);

/**
 * @description 是否是字符串
 * @returns {boolean} nothing
 * @param val {any} anything
 */
export const isString = (val: unknown): val is string => typeof val === "string";
/**
 * @description 是否是dom节点
 * @returns {boolean} nothing
 * @param e {any} anything
 */
export const isHTMLElement = (e: unknown): e is HTMLElement => e instanceof HTMLElement;

/**
 * @description 是否是Element
 * @returns {boolean} nothing
 * @param e {any} anything
 */
export const isElement = (e: unknown): e is Element => e instanceof Element;

/**
 * @description 空函数
 */
export const noop = () => undefined;
