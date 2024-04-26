import { IsNotEmpty, IsString, Length } from "class-validator";
import { Group } from "@lib/repository";

export class PatchAliasDto {
  @IsNotEmpty()
  @IsString()
  @Length(-1, 30)
  alias: Group["name"];

  @IsNotEmpty()
  @IsString()
  groupId: Group["id"];
}
