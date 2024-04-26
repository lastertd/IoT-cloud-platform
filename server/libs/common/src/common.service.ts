import { Injectable, Logger, NotAcceptableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Config, isEmpty } from "@/utils";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CommonService {
  private logger = new Logger();

  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService<Config>
  ) {}

  public getUid(request: Request) {
    const authorization = request.header("authorization");

    if (isEmpty(authorization)) {
      throw new NotAcceptableException("authorization is empty");
    }
    try {
      const info = this.jwtService.verify(authorization) as any;

      return info.user.uid as string;
    } catch (e) {
      this.logger.log(e);
      throw new NotAcceptableException(e);
    }
  }
}
