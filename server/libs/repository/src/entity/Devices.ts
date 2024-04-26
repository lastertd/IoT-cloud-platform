import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from "typeorm";
import { Group } from "@lib/repository";
import { Message } from "@lib/repository/entity/Message";

@Entity()
export class Devices {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    comment: "设备名称",
    nullable: false
  })
  name: string;

  @Column({
    comment: "设备名称别名"
  })
  alias: string;

  @Column({
    comment: "设备描述",
    nullable: true
  })
  description: string;

  @Column({
    comment: "设备标识符",
    nullable: true
  })
  symbol: string;

  @Column({
    comment: "设备类型",
    nullable: true
  })
  type: string;

  @Column({
    comment: "是否在线",
    default: false
  })
  isActive: boolean;

  @Column({
    comment: "最近的属性上报时间",
    nullable: true
  })
  attrPostTime: Date;

  @Column({
    comment: "最近的属性获取时间",
    nullable: true
  })
  attrGetTime: Date;

  @Column({
    comment: "最近的属性下发时间",
    nullable: true
  })
  attrPushTime: Date;

  @CreateDateColumn({
    comment: "创建时间"
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: "更新时间"
  })
  updateTime: Date;

  @ManyToOne(() => Group)
  group: Group;

  @OneToMany(() => Message, (Message) => Message.devices, {
    cascade: true,
    nullable: false
  })
  message: Message[];
}
