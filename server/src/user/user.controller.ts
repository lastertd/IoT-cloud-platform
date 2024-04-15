import { Controller, Post, Body, Inject, Res, HttpException, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginDto, RegisterDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { LoginGuard } from "@/guard";

@Controller("user")
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService;

  constructor(private readonly userService: UserService) {}

  @Post("register")
  async register(@Body() user: RegisterDto) {
    return this.userService.register(user);
  }

  @Post("login")
  async login(@Body() user: LoginDto, @Res({ passthrough: true }) res: Response) {
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

    throw new HttpException("server error ", 200);
  }

  @Get("test")
  @UseGuards(LoginGuard)
  test() {
    return {
      data: "这是一个测试"
    };
  }
}
