import { forwardRef, Module } from "@nestjs/common";
import { DevicesService } from "./devices.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Devices, Group, Message, User } from "@lib/repository";
import { GroupModule } from "@lib/group";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Group, Devices, Message]),
    forwardRef(() => GroupModule)
  ],
  providers: [DevicesService],
  exports: [DevicesService]
})
export class DevicesModule {}
