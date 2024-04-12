export interface Res<T> {
  code: number;
  message: string;
  data: T;
}

// 查询游戏圈下的游戏信息Option
export interface getcommunityDetialApiOption {
  /** 圈子id */
  circleId: string;
}
// 查询论坛详情Result
export interface getcommunityDetialApiResult {
  id?: string;
  name: string;
  /** 游戏圈描述 */
  description?: string;
  /** 图标 */
  icon: string;
  /** 帖子总数 */
  feedCount: number;
  /** 新帖子数 */
  newFeedCount: number;
  backend: string;
  briefIntro: string;
}
// 查询帖子详情Result
export interface getpostdetailApiResult {
  /** 昵称 */
  nickname: string;
  /** 头像 */
  avatar: string;
  /** 创建时间 */
  createTime: string;
  /** 游戏圈 */
  circleName?: string;
  /** 头像 */
  title?: string;
  /** 最后讨论时间 */
  lastDiscussionTime?: string;
  /** 帖子内容 */
  content: string;
  /** 帖子id */
  postId?: string;
  /** 浏览数量 */
  viewCount?: number;
  /**点击数量 */
  clickCount: number;
  /** 评论数量 */
  commentCount: number;
  /** 点赞数量 */
  likeCount: number;
  followStatus: boolean;
  circleId: string;
  /** 用户头衔 */
  labelInfo: {
    name: string;
    icon: string;
  };
  tagList: { tagId: number; tagName: string }[];
  /** 是否为精华贴 */
  essence: boolean;
  blockList: {
    name: string;
    circleId: string;
    displayPosition: number;
    id: number;
    sort: number;
  }[];
}
// 查询帖子详情Option
export interface getpostdetailApiOption {
  /** 帖子ID */
  postId: string;
}
/**
 * 查询帖子下评论Option
 */
export interface getpostcommentApiOption {
  moduleTypeCode: string;
  pageNum: number;
  pageSize: number;
  moduleContentId: string; // gameID 模块id
  queryType: number;
}
/**
 * 查询帖子下评论Result
 */
export interface getpostcommentApiResult {
  total: number;
  dataList: commentTypecommentType;
}
/**
 * 查询帖子下评论Result
 */
export interface commentType {
  avatar?: string;
  commentId: string;
  commentTime: number;
  content?: string;
  floor?: string;
  isQuality?: boolean;
  likeCount?: number;
  nickname?: string;
  opinion?: number;
  top?: boolean;
  replyCommonPage: {
    total: number;
  };
}

/**
 * 帖子文本对象类型
 */
export type contentType = {
  blockType: string;
  video: object;
  game: object;
  text: string;
  inlineStyleEntities: [];
  img: {
    url: string;
    cover: string;
    width: number;
    height: number;
  };
};

/**
 *  帖子内容
 */
export type PostContentType = {
  text: string;
  video: string;
  img: { img: { url: string } }[];
  game: PgcGameType[];
  ugcGame: UgcGameType[];
};
/**
 * pgc卡片类型
 */
export type PgcGameType = {
  game: {
    appName: string;
    gameId: string;
    iconUrl: string;
    popularity: string;
    packageName: string;
  };
};
/**
 * Ugc卡片类型
 */
export type UgcGameType = {
  ugcGame: {
    authorName: string;
    packageName: string;
    parentId: string;
    popularity: string;
    ugcGameName: string;
    ugcIcon: string;
    ugcId: string;
  };
};
/**
 * 获取uniqueId
 */
export type getuniqueIdApiOption = {
  shareId: string;
  gameId: string;
  pkgName: string;
};

/**
 * GameCardList
 */
export type gameCardListType = {
  briefIntro: string;
  gameIcon: string;
  gameId: string;
  gameLabelList: string[];
  gameName: string;
  gameScore: number;
  packageName: string;
};
