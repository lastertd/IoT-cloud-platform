import { Module } from "@nestjs/common";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group, User } from "@/repository/entity";
import { UserModule } from "@/src/user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Group, User]), UserModule],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService]
})
export class GroupModule {}
