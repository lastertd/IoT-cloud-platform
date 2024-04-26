export type Message = {
  id: number;

  name: string;

  alias: string;

  value: string;

  type: "attr" | "cmd";

  createTime: string;
};
