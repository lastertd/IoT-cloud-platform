import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  uid: number;

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

  @CreateDateColumn({
    comment: "创建时间"
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: "更新时间"
  })
  updateTime: Date;
}
