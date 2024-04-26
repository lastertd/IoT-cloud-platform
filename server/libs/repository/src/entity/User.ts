import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Group } from "@lib/repository";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Column()
  name: string;

  @Column({
    unique: true,
    nullable: false,
    comment: "联系方式:邮箱/手机号等"
  })
  contact: string;

  @Column({
    nullable: false,
    comment: "密码"
  })
  password: string;

  @Column({
    comment: "盐值"
  })
  salt: string;

  @Column({
    comment: "是否经过验证",
    default: false
  })
  isVerified: boolean;

  @Column({
    comment: "分组的最大数量",
    default: 5
  })
  limit: number;

  @CreateDateColumn({
    comment: "创建时间"
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: "更新时间"
  })
  updateTime: Date;

  @OneToMany(() => Group, (group) => group.user, {
    cascade: true,
    nullable: false
  })
  group: Group[];
}
