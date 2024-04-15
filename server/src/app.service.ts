import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { User } from "../repository/entity/User";

@Injectable()
export class AppService {
  @InjectEntityManager()
  private manager: EntityManager;

  getHello(): string {
    // const a =  this.manager.getRepository(User);

    return "Hello World!";
  }
}
