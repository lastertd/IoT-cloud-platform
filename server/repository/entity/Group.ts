import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { User } from "@/repository/entity/User";

@Entity()
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    comment: "项目名"
  })
  name: string;

  @Column({
    comment: "项目名称别名"
  })
  alias: string;

  @Column({
    comment: "最大设备数量",
    default: 7,
    nullable: false
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

  @ManyToOne(() => User)
  user: User;
}
