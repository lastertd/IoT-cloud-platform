import type { AnyConstructor } from "~/typings/type";

/**
 * @description 单例装饰器
 * @param classType
 * @returns 装饰后的构造函数
 */
const singleTon = function singleTon<T extends AnyConstructor>(classType: T) {
  let instance: T;
  return new Proxy(classType, {
    /**
     * @description 代理构造函数
     */
    construct(Target: T, args: any[]) {
      return instance || (instance = new Target(...args));
    }
  });
};

export { singleTon };
