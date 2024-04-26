import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Devices, Message } from "@lib/repository";
import { Repository } from "typeorm";
import { AddMessageDto } from "@lib/msg/dto/add-message.dto";
import { DevicesService } from "@lib/devices";

@Injectable()
export class MsgService {
  @InjectRepository(Devices)
  private devicesRepository: Repository<Devices>;

  @InjectRepository(Message)
  private messageRepository: Repository<Message>;

  constructor(private devicesService: DevicesService) {}

  /**
   * @description 添加一条消息记录
   */
  public async add(devicesId: Devices["id"], params: AddMessageDto) {
    const msg = new Message();
    Object.assign(msg, params);
    msg.alias = params.name;

    msg.devices = await this.devicesService.getDevicesById(devicesId);

    return this.messageRepository.save(msg);
  }

  /**
   * @description 通过Name属性获取所有的msg
   */
  public async getMsgByName(devicesId: Devices["id"], name: Message["name"]) {
    const devices = await this.devicesService.getDevicesById(devicesId);

    return await this.messageRepository.findBy({
      devices: { id: devices.id },
      name: name
    });
  }
}
