import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 30)
  @Matches(/^[a-zA-Z0-9#$%_-]+$/, {
    message: "用户名只能是字母、数字或者 #、$、%、_、- 这些字符"
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:\w(?:[\w-]*\w)?\.)+\w(?:[\w-]*\w)?/,
    {
      message: "邮箱格式非法"
    }
  )
  contact: string;
  @IsString()
  @IsNotEmpty()
  @Length(4, 30)
  @Matches(/^[a-zA-Z0-9#$%_-]+$/, {
    message: "密码只能是字母、数字或者 #、$、%、_、- 这些字符"
  })
  password: string;
}
