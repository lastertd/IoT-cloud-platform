import { alovaInstance } from "../../getAlovaInstance";
import type {
  Res,
  getcommunityDetialApiOption,
  getuniqueIdApiOption,
  getpostdetailApiResult,
  getpostdetailApiOption,
  getpostcommentApiOption,
  getpostcommentApiResult,
  gameCardListType
} from "./postdetails";
/**
 * 查询帖子详情
 * @param params
 * @returns
 */
export const getpostdetailApi = (params: getpostdetailApiOption) => {
  return alovaInstance.Get<Res<getpostdetailApiResult>>(`/community/post/v1/detail/query`, {
    params
  });
};

/**
 * 查询游戏圈下游戏信息
 * @data option
 */
export const getcommunityDetialApi = (params: getcommunityDetialApiOption) => {
  return alovaInstance.Get<Res<gameCardListType>>(`/community/v2/circle/game`, {
    params
  });
};

/**
 * 获取帖子下的评论
 * @param option
 */
export const getpostcommentApi = (option: getpostcommentApiOption) =>
  alovaInstance.Post<Res<getpostcommentApiResult>, getpostcommentApiOption>(
    "/community/comment/v1/query",
    option
  );

/**
 * 获取拉起游戏分享页面唯一id
 */
export const getuniqueIdApi = (option: getuniqueIdApiOption) => {
  return alovaInstance.Post<{ data: string }, getuniqueIdApiOption>(`/data/relay/v2/set`, option);
};
