/**
 * @description api 登录权限验证
 */

import { JwtService } from "@nestjs/jwt";
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.header("authorization") || "";

    try {
      const info = this.jwtService.verify(authorization);
      (request as any).user = info.user as { uid: string };
      return true;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
