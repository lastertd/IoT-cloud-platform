import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { getConfig, isEmpty } from "@/utils";

/**
 * @description 获取token
 * @returns uuid
 */
export const getToken = (request: Request) => {
  const config = getConfig();
  const jwtParse = new JwtService(config.jwt);
  const authorization = request.header("authorization");

  if (isEmpty(authorization)) return undefined;

  try {
    const info = jwtParse.verify(authorization);

    return info.user.uid as string;
  } catch (e) {
    return undefined;
  }
};
