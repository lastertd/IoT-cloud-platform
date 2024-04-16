import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  contactOrName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
