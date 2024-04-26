import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@lib/repository";
import { UserModule } from "@lib/user";
import { UserConController } from "./user.con.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [UserConController]
})
export class UserConModule {}
