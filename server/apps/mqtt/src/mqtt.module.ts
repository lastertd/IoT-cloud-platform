import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { getConfig } from "@/utils";
import { ConfigModule } from "@nestjs/config";
import { EmailModule } from "@lib/email";
import { CommonModule } from "@lib/common";
import { appDataBaseConfig } from "@lib/repository";
import { MqttService } from "@/apps/mqtt/src/mqtt.service";
import { DevicesModule } from "@lib/devices";
import { MsgModule } from "@lib/msg";

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
    DevicesModule,
    MsgModule
  ],
  exports: [MqttService],
  providers: [MqttService]
})
export class AppModule {}
