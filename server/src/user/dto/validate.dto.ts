import { IsString } from "class-validator";
import { User } from "@/repository/entity";

export class ValidateDto {
  @IsString()
  uid: User["uid"];
}
