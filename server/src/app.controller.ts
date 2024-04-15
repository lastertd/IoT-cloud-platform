import { Controller, Get, Inject, ParseUUIDPipe, Query } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  @Inject(AppService)
  private appService: AppService;

  constructor() {}

  @Get("/test")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/qqq")
  queryHello(@Query("num", ParseUUIDPipe) num: number) {
    return num;
  }
}
