// https://meta.feishu.cn/wiki/HMq7wgdatiBPq6kX750cj7tznKc

interface ConfigResult {
  startMode: "233-HTTP" | "233-FILE" | "GPARK-HTTP" | "GPARK-FILE";
  env: "TEST" | "PRE" | "PROD";
  mode: "development" | "production";
  leYuanRsaKey: string;
  usualServerUrl: string;
  // 233或者gpark通过env文件配置的baseUrl
  baseUrl: string;
  // pandora 相关
  pandoraIndexType: string;
  pandoraSelfpackagename: string;
  pandoraAppkey: string;
  pandoraBaseUrl: string;
  pandoraZone: string;
}

/**
 * 查看配置信息
 */
export function useConfig(): ConfigResult {
  return {
    startMode: import.meta.env.VITE_START_MODE,
    env: import.meta.env.VITE_ENV,
    mode: import.meta.env.MODE,
    usualServerUrl: import.meta.env.VITE_USUAL_SERVER_URL,
    leYuanRsaKey: import.meta.env.VITE_LE_YUAN_RSA_KEY,
    baseUrl: import.meta.env.VITE_BASE_URL,
    // pandora
    pandoraIndexType: import.meta.env.VITE_PANDORA_INDEX_TYPE,
    pandoraSelfpackagename: import.meta.env.VITE_PANDORA_SELFPACKAGENAME,
    pandoraAppkey: import.meta.env.VITE_PANDORA_AOOKEY,
    pandoraBaseUrl: import.meta.env.VITE_PANDORA_BASEURL,
    pandoraZone: import.meta.env.VITE_PANDORA_ZONE
  } as unknown as ConfigResult;
}
