type PushOptions = {
  query?: { [k: string]: number | string };
};

const witchQuery = (path: string, query: PushOptions["query"]) => {
  if (isEmpty(query)) {
    return path;
  }

  // 构建查询参数字符串
  const queryString = Object.keys(query)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join("&");

  // 如果有查询参数，则在路径末尾添加查询参数，否则直接返回路径
  return queryString ? `${path}?${queryString}` : path;
};

export const navManager = {
  async push(path: string, options?: PushOptions) {
    await useRouter().push(witchQuery(path, options?.query));
  },

  async replace(path: string) {
    await useRouter().replace(path);
  },

  async back() {
    await delay(150);
    useRouter().back();
  }
};
