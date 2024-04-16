import { IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { User } from "@/repository/entity";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 30)
  @Matches(/^[a-zA-Z0-9#$%_-]+$/, {
    message: "用户名只能是字母、数字或者 #、$、%、_、- 这些字符"
  })
  name: User["name"];

  @IsString()
  @IsNotEmpty()
  @Matches(
    /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:\w(?:[\w-]*\w)?\.)+\w(?:[\w-]*\w)?/,
    {
      message: "邮箱格式非法"
    }
  )
  contact: User["contact"];
  @IsString()
  @IsNotEmpty()
  @Length(4, 30)
  @Matches(/^[a-zA-Z0-9#$%_-]+$/, {
    message: "密码只能是字母、数字或者 #、$、%、_、- 这些字符"
  })
  password: User["password"];
}
