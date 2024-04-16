import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import appDataBaseConfig from "../repository/data-source";
import { JwtModule } from "@nestjs/jwt";
import { getConfig } from "@/utils";
import { ConfigModule } from "@nestjs/config";

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
    UserModule
  ]
})
export class AppModule {}
