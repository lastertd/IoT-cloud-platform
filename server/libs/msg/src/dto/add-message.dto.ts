import { IsNotEmpty, IsString } from "class-validator";
import { Message } from "@lib/repository";

export class AddMessageDto {
  @IsString()
  @IsNotEmpty()
  name: Message["name"];

  @IsString()
  value: Message["value"];
}
