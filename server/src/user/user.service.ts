import { HttpException, Inject, Injectable, Logger } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from "crypto";
import { User } from "@/repository/entity";
import { JwtService } from "@nestjs/jwt";

/**
 * @description 生成盐值
 */
const generateSalt = (): string => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let salt = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    salt += charset[randomIndex];
  }
  return salt;
};

/**
 * @description 生成密码
 * @param pswd 原密码
 * @param salt 盐值
 */
const generatePassword = (pswd: string, salt: string): string => {
  const str = pswd + salt;
  const hash = crypto.createHash("md5");
  hash.update(str);
  return hash.digest("hex");
};

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async register(user: RegisterDto) {
    // 用户名已存在
    const isNameExist = await this.userRepository.findOneBy({
      name: user.name
    });
    if (isNameExist) {
      return new HttpException("用户已存在", 200);
    }

    // 邮箱已存在
    const isContactExist = await this.userRepository.findOneBy({
      contact: user.contact
    });
    if (isContactExist) {
      throw new HttpException("邮箱已被注册", 200);
    }

    // 新建用户
    const newUser = new User();
    Object.assign(newUser, user);
    newUser.salt = generateSalt();
    newUser.password = generatePassword(user.password, newUser.salt);

    try {
      await this.userRepository.save(newUser);
      return new HttpException("注册成功", 200);
    } catch (e) {
      this.logger.error(e, UserService);
      return new HttpException("注册失败", 200);
    }
  }

  async login(user: LoginDto) {

    console.log(user, "web user");

    const foundUser = await this.userRepository.findOneBy([
      {
        name: user.contactOrName
      },
      {
        contact: user.contactOrName
      }
    ]);

    if (!foundUser) {
      throw new HttpException("用户不存在", 200);
    }

    if (foundUser.password !== generatePassword(user.password, foundUser.salt)) {
      throw new HttpException("账户密码不匹配", 200);
    }
    return foundUser;
  }
}
