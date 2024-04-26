export type Group = {
  id: string;
  name: string;
  alias: string;
  description: string;
  limit: number;
  createTime: Date;
  updateTime: Date;
};

export type DevicesCnt = {
  cnt: number;
  online: number;
  active: number;
};
