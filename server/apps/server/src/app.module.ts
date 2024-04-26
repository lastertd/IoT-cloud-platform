import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { getConfig } from "@/utils";
import { ConfigModule } from "@nestjs/config";
import { EmailModule } from "@lib/email";
import { CommonModule } from "@lib/common";
import { appDataBaseConfig } from "@lib/repository";
import { GroupConModule } from "@server/src/group.con";
import { UserConModule } from "@server/src/user.con/user.con.module";
import { DevicesConModule } from "@server/src/devices.con/devices.con.module";

const config = getConfig();

@Module({
  imports: [
    TypeOrmModule.forRoot(appDataBaseConfig),
    JwtModule.register({
      global: true,
      ...config.jwt
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      load: [getConfig]
    }),
    EmailModule,
    CommonModule,
    GroupConModule,
    UserConModule,
    DevicesConModule
  ]
})
export class AppModule {}
