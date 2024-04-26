import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  ValidationPipe,
  Logger,
  NotAcceptableException
} from "@nestjs/common";
import { Request } from "express";
import { CommonService } from "@lib/common";
import { LoginGuard } from "@server/src/guard";
import { AddGroupDto, GroupService, PatchAliasDto } from "@lib/group";
import { UserService } from "@lib/user";
import { Group } from "@lib/repository";

@Controller("group")
@UseGuards(LoginGuard)
export class GroupConController {
  private logger = new Logger();

  constructor(
    private readonly groupService: GroupService,
    private readonly commonService: CommonService,
    private readonly userService: UserService
  ) {}

  @Post("/add")
  async add(@Body(ValidationPipe) createGroupDto: AddGroupDto, @Req() request: Request) {
    const user = await this.userService.findOneByUid(this.commonService.getUid(request));

    const cnt = (await this.groupService.findAll(user)).length;

    if (cnt >= user.limit) {
      throw new NotAcceptableException("超过最大分组数量");
    }

    await this.groupService.add(createGroupDto, user);
    return "success";
  }

  @Post("/patchAlias")
  async patchAlias(@Body(ValidationPipe) patchAliasDto: PatchAliasDto) {
    await this.groupService.patchAlias(patchAliasDto);
    return "success";
  }

  @Post("/getInfo")
  async getInfo(@Body("groupId") groupId: Group["id"]) {
    // return groupId;

    return await this.groupService.getInfo(groupId);
  }

  @Get("/")
  async findAll(@Req() request: Request) {
    const user = await this.userService.findOneByUid(this.commonService.getUid(request));

    return this.groupService.findAll(user);
  }
}
