import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import { Devices, Group } from "@lib/repository";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: "消息名"
  })
  name: string;

  @Column({
    comment: "消息别名"
  })
  alias: string;

  @Column({
    comment: "消息值",
    nullable: true
  })
  value: string;

  @Column({
    comment: "消息类型",
    default: "attr"
  })
  type: "attr" | "cmd";

  @CreateDateColumn({
    comment: "创建时间"
  })
  createTime: Date;

  @ManyToOne(() => Devices)
  devices: Devices;
}
