import { Injectable, NotAcceptableException } from "@nestjs/common";
import { Group, User } from "@/repository/entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { isEmpty } from "@/utils";
import { AddGroupDto, PatchAliasDto } from "@/src/group/dto";

@Injectable()
export class GroupService {
  @InjectRepository(Group)
  private groupRepository: Repository<Group>;

  async add(g: AddGroupDto, user: User) {
    const group = new Group();

    group.name = g.name;
    group.alias = g.name;
    group.user = user;

    const a = await this.groupRepository.save(group);

    return await this.groupRepository.findOneBy({
      id: a.id
    });
  }

  async patchAlias(params: PatchAliasDto) {
    const group = await this.findOneById(params.groupId);

    group.alias = params.alias;

    return this.groupRepository.save(group);
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
