import { IsString } from "class-validator";
import { User } from "@lib/repository";

export class ValidateDto {
  @IsString()
  uid: User["uid"];
}
