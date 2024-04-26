interface ConfigResult {
  env: "DEV" | "PROD";
  mode: "development" | "production";
  baseUrl: string;
}

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

export const getConfig = () => {
  return {
    mode: import.meta.env.MODE,
    env: import.meta.env.VITE_ENV,
    baseUrl: import.meta.env.VITE_BASE_URL
  } as unknown as ConfigResult;
};
