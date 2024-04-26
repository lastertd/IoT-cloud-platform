/**
 * @description 格式化正常数据返回
 * @link https://www.mulingyuer.com/archives/977/#:~:text=Nestjs%E4%B8%AD%EF%BC%8C,%E6%9D%A5%E6%94%B9%E5%86%99%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F%E3%80%82
 */

import { hasKeys } from "@/utils";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import type { Response } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getReasonPhrase } from "http-status-codes";

@Injectable()
export class IntegrateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code =
      200 <= response.statusCode && response.statusCode <= 300 ? 200 : response.statusCode;
    const message = response.statusMessage || getReasonPhrase(code);

    return next.handle().pipe(
      map((data) => {
        // 判断是否已经是格式化的数据
        if (data) {
          const hasFormat = hasKeys(data, ["code", "message", "data"]);
          if (hasFormat) return data;
        }

        return {
          code: code,
          message: message,
          data: data ?? null
        };
      })
    );
  }
}
