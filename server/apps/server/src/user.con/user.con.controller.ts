import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Post,
  Query,
  Res,
  UseGuards,
  ValidationPipe
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { EmailService } from "@lib/email";
import { User } from "@lib/repository";
import { LoginGuard } from "@server/src/guard";
import { LoginDto, RegisterDto, UserService, ValidateDto } from "@lib/user";

@Controller("user")
export class UserConController {
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(EmailService)
  private emailService: EmailService;

  constructor(private readonly userService: UserService) {}

  @Post("register")
  async register(@Body(ValidationPipe) user: RegisterDto) {
    const res = await this.userService.register(user);

    if (res instanceof User) {
      await this.emailService.validateSend(res);

      return "注册成功";
    }
  }

  @Post("login")
  async login(@Body(ValidationPipe) user: LoginDto, @Res({ passthrough: true }) res: Response) {
    const foundUser = await this.userService.login(user);

    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          uid: foundUser.uid
        }
      });
      res.setHeader("token", token);
      return {
        token
      };
    }

    throw new HttpException("server error ", 400);
  }

  @Get("/validate")
  async validate(@Query(ValidationPipe) query: ValidateDto) {
    return await this.userService.validate(query);
  }

  @Get("test")
  @UseGuards(LoginGuard)
  async test() {
    await this.emailService.testSend();

    return "111";
  }
}
