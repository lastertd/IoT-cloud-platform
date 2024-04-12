import { defineMock } from "@alova/mock";

export const test = defineMock(
  {
    // 捕获get请求
    [`[POST]/ccc`]: () => {
      return {
        code: 200,
        message: "ok",
        data: {
          c: "234343"
        }
      };
    }
  },
  true
);
