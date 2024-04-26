import { Global, Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { getConfig } from "@/utils";

const config = getConfig();

@Global()
@Module({
  imports: [
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
    })
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
