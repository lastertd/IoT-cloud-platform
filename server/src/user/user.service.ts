import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotAcceptableException
} from "@nestjs/common";
import { LoginDto, RegisterDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from "crypto";
import { User } from "@/repository/entity";

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
      throw new BadRequestException("用户已存在");
    }

    // 邮箱已存在
    const isContactExist = await this.userRepository.findOneBy({
      contact: user.contact
    });
    if (isContactExist) {
      throw new BadRequestException("邮箱已被注册");
    }

    // 新建用户
    const newUser = new User();
    Object.assign(newUser, user);
    newUser.salt = generateSalt();
    newUser.password = generatePassword(user.password, newUser.salt);

    try {
      await this.userRepository.save(newUser);
      return "注册成功";
    } catch (e) {
      this.logger.error(e, UserService);
      new InternalServerErrorException("注册失败");
    }
  }

  async login(user: LoginDto) {
    const foundUser = await this.userRepository.findOneBy([
      {
        name: user.contactOrName
      },
      {
        contact: user.contactOrName
      }
    ]);

    if (!foundUser) {
      throw new NotAcceptableException("用户不存在, 请先注册");
    }

    if (foundUser.password !== generatePassword(user.password, foundUser.salt)) {
      throw new NotAcceptableException("账户密码不匹配, 请重新输入");
    }
    return foundUser;
  }
}
