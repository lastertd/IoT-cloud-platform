import { alovaBase, alovaTest } from "../../getAlovaInstance";

export const wxAppId = "wxb5026abcf3d07858";

export interface WxConfigOption {
  /** 微信商户号 */
  appId: string;
  /** 当前页面url */
  url: string;
}

export interface WxConfigResult {
  /** 随机字符串 */
  nonceStr: string;
  /** 时间戳 单位秒 */
  timestamp: number;
  /** 加密签 */
  signature: string;
}

/**
 * 获取页面中枢对应url
 * @link {https://mock.metaapp.cn/project/132/interface/api/51024}
 */
export const wxConfig = (body: WxConfigOption) => {
  return alovaTest.Post<WxConfigResult>(`/auth/v1/wechat/sub/config`, body);
};
