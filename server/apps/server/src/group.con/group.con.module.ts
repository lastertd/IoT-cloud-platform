import { Module } from "@nestjs/common";
import { GroupModule } from "@lib/group";
import { GroupConController } from "./group.con.controller";
import { UserModule } from "@lib/user";

@Module({
  imports: [GroupModule, UserModule],
  controllers: [GroupConController]
})
export class GroupConModule {}
