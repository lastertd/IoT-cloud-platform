import { Module } from "@nestjs/common";
import { MsgService } from "./msg.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Devices, Group, Message, User } from "@lib/repository";
import { DevicesModule } from "@lib/devices";

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, Devices, Message]), DevicesModule],
  providers: [MsgService],
  exports: [MsgService]
})
export class MsgModule {}
