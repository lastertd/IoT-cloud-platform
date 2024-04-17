import { Group } from "@/repository/entity";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class AddGroupDto {
  @IsNotEmpty()
  @IsString()
  @Length(-1, 30)
  name: Group["name"];
}
