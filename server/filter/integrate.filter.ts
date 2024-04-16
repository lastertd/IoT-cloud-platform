/**
 * @description 格式化异常返回
 */

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class IntegrateFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();

    const res = exception.getResponse() as any;

    response.status(400).json({
      code: exception.getStatus(),
      message: res?.message || exception.message || "",
      data: null
    });
  }
}
