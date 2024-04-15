import "reflect-metadata";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";
import { User } from "@/repository/entity";

export const appDataBaseConfig: DataSourceOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "last8872287a",
  database: "gra",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
  connectorPackage: "mysql2",
  extra: {
    authPlugin: "sha256_password"
  }
};

export default appDataBaseConfig;
