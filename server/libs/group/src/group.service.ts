import { forwardRef, Inject, Injectable, Logger, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { isEmpty } from "@/utils";
import { Group, Message, User } from "@lib/repository";
import { AddGroupDto, PatchAliasDto } from "@lib/group/dto";
import { DevicesService } from "@lib/devices";

@Injectable()
export class GroupService {
  @InjectRepository(Group)
  private groupRepository: Repository<Group>;
  @InjectRepository(Message)
  private messageRepository: Repository<Message>;

  @Inject(forwardRef(() => DevicesService))
  private devicesService: DevicesService;

  private logger = new Logger();

  async add(params: AddGroupDto, user: User) {
    const group = new Group();

    Object.assign(group, params);
    group.alias = params.name;
    group.user = user;

    const a = await this.groupRepository.save(group);

    return await this.groupRepository.findOneBy({
      id: a.id
    });
  }

  async findOnById(gid: Group["id"]) {
    const group = await this.groupRepository.findOneBy({
      id: gid
    });

    if (isEmpty(group)) {
      this.logger.error("查询分组信息为空");
      throw new NotAcceptableException("查询分组信息为空");
    }

    return group;
  }

  async patchAlias(params: PatchAliasDto) {
    const group = await this.findOneById(params.groupId);

    group.alias = params.alias;

    return this.groupRepository.save(group);
  }

  /**
   * @description 获取指定群组下今天的所有消息总数
   */
  public async getMessageCountByGroupToday(groupId: Group["id"]) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 设置时间为今天凌晨

    // 查询该群组下所有设备的今天的消息总数
    return await this.messageRepository
      .createQueryBuilder("message")
      .innerJoin("message.devices", "devices")
      .innerJoin("devices.group", "group")
      .where("group.id = :groupId", { groupId: groupId })
      .andWhere("message.createTime >= :today", { today: today })
      .getCount();
  }

  /**
   * @description 查询分组信息
   * @param groupId
   */
  async getInfo(groupId: Group["id"]) {
    const group = await this.findOnById(groupId);
    const devices = await this.devicesService.getDevicesCntByGroup(group);
    const cnt = await this.getMessageCountByGroupToday(groupId);


    return {
      group,
      devices,
      message: {
        cnt
      }
    };
  }

  async findAll(user: User) {
    return await this.groupRepository.findBy({
      user: { uid: user.uid }
    });
  }

  async findOneById(id: Group["id"]) {
    const group = await this.groupRepository.findOneBy({
      id
    });

    if (isEmpty(group)) {
      throw new NotAcceptableException("分组不存在");
    }

    return group;
  }
}
