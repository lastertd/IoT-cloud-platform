import { forwardRef, Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import { Devices, Group, Message } from "@lib/repository";
import { AddDevicesDto } from "@lib/devices/dto/add-devices.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { isEmpty } from "@/utils";
import { GroupService } from "@lib/group";

@Injectable()
export class DevicesService {
  @InjectRepository(Devices)
  private devicesRepository: Repository<Devices>;

  @InjectRepository(Message)
  private messageRepository: Repository<Message>;

  @Inject(forwardRef(() => GroupService))
  private groupService: GroupService;

  /**
   * @description 添加一个新的设备
   */
  public async add(params: AddDevicesDto) {
    const group = await this.groupService.findOnById(params.groupId);

    const cnt = await this.devicesRepository.countBy({
      group: { id: group.id }
    });

    const devices = new Devices();

    if (cnt >= group.limit) {
      throw new NotAcceptableException("设备数量达到上限");
    }

    devices.group = group;
    devices.alias = devices.name = params.name;
    devices.type = params.type;
    devices.description = params.description;

    await this.devicesRepository.save(devices);

    return true;
  }

  public async findOnById(devicesId: Devices["id"]) {
    const devices = await this.devicesRepository.findOneBy({
      id: devicesId
    });

    if (isEmpty(devices)) {
      throw new NotAcceptableException("设备不存在");
    }

    return devices;
  }

  public async patchAttrPostTime(devicesId: Devices["id"]) {
    const devices = await this.findOnById(devicesId);

    devices.attrPostTime = new Date();

    await this.devicesRepository.save(devices);

    return true;
  }

  /**
   * @description 获取所有设备
   */
  public async getAll(groupId: Group["id"]) {
    const group = await this.groupService.findOnById(groupId);

    return await this.devicesRepository.findBy({
      group: { id: group.id }
    });
  }

  public async getDevicesById(devicesId: Devices["id"]) {
    const devices = await this.devicesRepository.findOneBy({
      id: devicesId
    });

    if (isEmpty(devices)) {
      throw new NotAcceptableException("查无此设备");
    }

    return devices;
  }

  public async auth(username: Group["id"], password: Devices["id"]) {
    const devices = await this.devicesRepository.findOneBy({
      id: password,
      group: { id: username }
    });

    if (isEmpty(devices)) {
      throw new NotAcceptableException("授权失败");
    }

    return devices;
  }

  /**
   * @description 获取设备的时间信息
   */
  public async getTimeInfo(devicesId: Devices["id"]) {
    const devices = await this.devicesRepository.findOneBy({
      id: devicesId
    });

    return {
      attrPostTime: devices?.attrPostTime ?? undefined,
      attrGetTime: devices?.attrGetTime ?? undefined,
      attrPushTime: devices?.attrPushTime ?? undefined
    };
  }

  /**
   * @description 获取设备数量
   */
  public async getDevicesCntByGroup(group: Group) {
    const cnt = await this.devicesRepository.countBy({
      group: { id: group.id }
    });
    const online = await this.devicesRepository.countBy({
      group: { id: group.id },
      isActive: true
    });

    return {
      cnt: cnt,
      online: online,
      active: online
    };
  }

  /**
   * @description 获取设备的消息信息, 每组消息获取最新的一个
   */
  public async getMsgInfo(devicesId: Devices["id"]) {
    const a = await this.messageRepository
      .createQueryBuilder("message")
      .where("message.devicesId = :id", { id: devicesId })
      .andWhere((qb) => {
        // 子查询：在每个分组中找到最新的 createTime 值
        const subQuery = qb
          .subQuery()
          .select("MAX(subMessage.createTime)")
          .from(Message, "subMessage")
          .where("subMessage.devicesId = :id", { id: devicesId })
          .andWhere("subMessage.name = message.name")
          .getQuery();

        // 连接：将子查询的结果与原始查询关联起来
        return "message.createTime IN " + subQuery;
      })
      .getMany();

    // 将value JSON解码
    for (const message of a) {
      message.value = JSON.parse(message.value);
    }

    return a;
  }

  public async patchStatus(devicesId: Devices["id"], status: Devices["isActive"]) {
    const devices = await this.getDevicesById(devicesId);

    devices.isActive = status;

    return await this.devicesRepository.save(devices);
  }
}
