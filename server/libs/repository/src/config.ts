import "reflect-metadata";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { Devices, Group, Message, User } from "./entity";
import { getConfig } from "@/utils";

const config = getConfig();

export const appDataBaseConfig: DataSourceOptions = {
  type: "mysql",
  host: config.mysql.host,
  port: config.mysql.port,
  username: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.database,
  synchronize: true,
  logging: false,
  entities: [User, Group, Devices, Message],
  migrations: [],
  subscribers: [],
  connectorPackage: "mysql2",
  extra: {
    authPlugin: "sha256_password"
  }
};

export default appDataBaseConfig;
