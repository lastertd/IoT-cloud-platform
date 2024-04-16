import * as process from "process";
import * as path from "path";
import * as fs from "fs";
import { parse } from "yaml";

export interface ServerOptions {
  host: string;
  port: number;
}

export interface DatabaseOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface jwtOptions {
  secret: string;
  signOptions: {
    expiresIn: string;
  };
}

export interface Config {
  server: ServerOptions;
  mysql: DatabaseOptions;
  jwt: jwtOptions;
}

export const getEnv = () => {
  return process.env.NODE_ENV as "DEV" | "PROD";
};

export const isDev = () => getEnv() === "DEV";
export const getConfig = () => {
  const env = getEnv();
  const yamlPath = path.join(process.cwd(), `./env/env.${env.toLowerCase()}.yaml`);
  const file = fs.readFileSync(yamlPath, "utf8");
  return parse(file) as Config;
};
