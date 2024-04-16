import { IsNotEmpty, IsString } from "class-validator";
import { User } from "@/repository/entity";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  contactOrName: User["contact"] | User["name"];

  @IsNotEmpty()
  @IsString()
  password: User["password"];
}
