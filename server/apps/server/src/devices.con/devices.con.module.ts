import { Module } from "@nestjs/common";
import { DevicesConController } from "./devices.con.controller";
import { DevicesModule } from "@lib/devices";

@Module({
  imports: [DevicesModule],
  controllers: [DevicesConController]
})
export class DevicesConModule {}
