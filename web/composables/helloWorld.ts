/** 获取 hello world 文本的函数 */
export function useHelloWorld() {
  const text = ref("hello world");
  return {
    text
  };
}
