import { IsNotEmpty, IsString } from "class-validator";
import { User } from "@lib/repository";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  contactOrName: User["contact"] | User["name"];

  @IsNotEmpty()
  @IsString()
  password: User["password"];
}
