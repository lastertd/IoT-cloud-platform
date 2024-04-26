import {
  Controller,
  Get,
  Body,
  UseGuards,
  ValidationPipe,
  Post,
  Param,
  Query
} from "@nestjs/common";
import { DevicesService } from "@lib/devices";
import { LoginGuard } from "@server/src/guard";
import { Devices, Group } from "@lib/repository";
import { AddDevicesDto } from "@lib/devices/dto/add-devices.dto";

@Controller("/devices")
@UseGuards(LoginGuard)
export class DevicesConController {
  constructor(private readonly devicesConService: DevicesService) {}

  @Get("/")
  public async findAll(@Query("groupId") groupId: Group["id"]) {
    return await this.devicesConService.getAll(groupId);
  }

  @Get("/getBaseInfo")
  public async getDevices(@Query("devicesId") devicesId: Devices["id"]) {
    return await this.devicesConService.findOnById(devicesId);
  }

  @Get("/getMsgInfo")
  public async getMsgInfo(@Query("devicesId") devicesId: Devices["id"]) {
    return await this.devicesConService.getMsgInfo(devicesId);
  }

  @Post("/add")
  public async add(@Body(ValidationPipe) params: AddDevicesDto) {
    return this.devicesConService.add(params);
  }
}
