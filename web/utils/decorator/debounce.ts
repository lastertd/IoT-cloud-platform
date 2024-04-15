import type { AnyFunction } from "~/typings/type";

/**
 * @description 防抖装饰器, fn返回值将被忽略
 * @param fn  函数
 * @param  timeout  default = 0
 * @param  context 执行上下文
 * @returns  防抖后的函数
 */
const debounce = function debounce<T extends AnyFunction>(fn: T, timeout = 0, context?: object) {
  let timer: any;

  return function debounceInner(...args: Parameters<T>): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, timeout);
  };
};

/**
 * @description 异步防抖装饰器, 适用于fn需要返回值的时候
 * @param fn
 * @param timeout default = 0
 * @param context 执行上下文
 * @returns 异步防抖后的函数
 */
const asyncDebounce = function asyncDebounce<T extends AnyFunction>(
  fn: T,
  timeout: number = 0,
  context?: object
) {
  let timer: any;
  return function asyncDebounceInner(...args: Parameters<T>): Promise<ReturnType<T>> {
    clearTimeout(timer);

    return new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        try {
          resolve(fn.apply(context, args));
        } catch (e) {
          reject(e);
        }
      }, timeout);
    });
  };
};

export { debounce, asyncDebounce };
