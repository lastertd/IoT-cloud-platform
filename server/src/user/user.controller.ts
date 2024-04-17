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
import { UserService } from "./user.service";
import { LoginDto, RegisterDto, ValidateDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { EmailService } from "@/src/email/email.service";
import { User } from "@/repository/entity";
import { LoginGuard } from "@/src/guard";

@Controller("user")
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(EmailService)
  private emailService: EmailService;

  constructor(private readonly userService: UserService) {}

  @Post("register")
  async register(@Body(ValidationPipe) user: RegisterDto) {
    const res = await this.userService.register(user);

    if (res instanceof User) {
      this.emailService.validateSend(res).catch();

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
      return "login success";
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
