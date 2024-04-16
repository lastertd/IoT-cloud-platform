import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";
import { Config } from "@/utils";
import { User } from "@/repository/entity";
import * as fs from "fs";
import * as path from "path";
import * as process from "process";

@Injectable()
export class EmailService {
  private logger = new Logger();

  @Inject(ConfigService)
  private configService: ConfigService<Config>;

  @Inject(MailerService)
  private mailerService: MailerService;

  async validateSend(user: User) {
    let template = fs.readFileSync(
      path.join(process.cwd(), "/src/email/template/validate.html"),
      "utf-8"
    );

    const prefix = `${this.configService.get("web").host}:${this.configService.get("web").port}`;

    const webUrlDocs = `${prefix}/docs/`;
    const webUrlValidate = `${prefix}/validate?uid=${user.uid}`;

    template = template
      .replace(/{{webUrlDocs}}/g, webUrlDocs)
      .replace(/{{webUrlValidate}}/g, webUrlValidate);

    return await this.send("lasterxin@163.com", {
      subject: "您的邮箱验证",
      content: template
    });
  }

  async send(
    target: string,
    options?: {
      subject?: string;
      content?: string;
    }
  ) {
    await this.mailerService.sendMail({
      to: target,
      from: `Chtholly<${this.configService.get("email").auth.user}>`,
      subject: options?.subject ?? "无主题",
      html: options?.content ?? "无内容, 如果您看到了此内容，请忽略"
    });
  }

  async testSend() {
    let template = fs.readFileSync(
      path.join(process.cwd(), "/src/email/template/validate.html"),
      "utf-8"
    );

    const prefix = `${this.configService.get("web").host}:${this.configService.get("web").port}`;

    const webUrlDocs = `${prefix}/docs/`;
    const webUrlValidate = `${prefix}/validate?uid=3fe31e51-4ba7-457e-be84-962f4431a2f5`;

    template = template
      .replace(/{{webUrlDocs}}/g, webUrlDocs)
      .replace(/{{webUrlValidate}}/g, webUrlValidate);

    console.log(template);

    return await this.send("lasterxin@163.com", {
      subject: "您的邮箱验证",
      content: template
    });
  }
}
