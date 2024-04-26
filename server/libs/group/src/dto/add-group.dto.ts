import { IsString, Length, Matches } from "class-validator";
import { Devices, Group } from "@lib/repository";

export class AddGroupDto {
  @IsString()
  @Length(1, 30)
  @Matches(/^[a-zA-Z0-9#$%_-]+$/, {
    message: "用户名只能是字母、数字或者 #、$、%、_、- 这些字符"
  })
  name: Group["name"];

  @IsString()
  description: Devices["description"];
}
