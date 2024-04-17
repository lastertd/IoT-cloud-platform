import { Group } from "@/repository/entity";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class PatchAliasDto {
  @IsNotEmpty()
  @IsString()
  @Length(-1, 30)
  alias: Group["name"];

  @IsNotEmpty()
  @IsString()
  groupId: Group["id"];
}
