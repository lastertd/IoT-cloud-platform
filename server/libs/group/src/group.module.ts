import { forwardRef, Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group, Message, User } from "@lib/repository";
import { UserModule } from "@lib/user";
import { DevicesModule } from "@lib/devices";

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, User, Message]),
    UserModule,
    forwardRef(() => DevicesModule)
  ],
  providers: [GroupService],
  exports: [GroupService]
})
export class GroupModule {}
