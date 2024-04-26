import { IsNotEmpty, IsString } from "class-validator";
import { Devices, Group } from "@lib/repository";

export class AddDevicesDto {
  @IsString()
  @IsNotEmpty()
  groupId: Group["id"];

  @IsString()
  @IsNotEmpty()
  name: Devices["name"];

  symbol: Devices["symbol"];

  type: Devices["type"];

  description: Devices["description"];
}
