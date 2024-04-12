/**
 * @description: 判断是否是客户端, node环境下无window
 */
export const isClient = () => {
  try {
    window.___is__client = true;
    return true;
  } catch (error) {
    return false;
  }
};
