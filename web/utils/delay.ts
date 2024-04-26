/**
 * @description 休眠函数
 * @param timeout 休眠时间， 设置为负数会永久休眠
 * @returns Promise<void>
 */
export const delay = (timeout: number) => {
  return new Promise((resolve) => {
    if (timeout < 0) return;
    setTimeout(resolve, timeout);
  });
};
