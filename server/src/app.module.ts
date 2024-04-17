import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import appDataBaseConfig from "../repository/data-source";
import { JwtModule } from "@nestjs/jwt";
import { getConfig } from "@/utils";
import { ConfigModule } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { EmailModule } from "./email/email.module";
import { GroupModule } from "./group/group.module";
import { CommonModule } from "./common/common.module";

const config = getConfig();

console.log(config.email);

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
    MailerModule.forRoot({
      transport: config.email,
      defaults: {
        from: "未设置主题"
      },
      preview: false,
      template: {
        dir: process.cwd() + "/template/",
        adapter: new PugAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true
        }
      }
    }),
    UserModule,
    EmailModule,
    GroupModule,
    CommonModule
  ]
})
export class AppModule {}
