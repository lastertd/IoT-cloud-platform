import * as process from "process";
import * as path from "path";
import * as fs from "fs";
import { parse } from "yaml";
import { networkInterfaces } from "os";

export interface WebOptions {
  host: string;
  port: number;
}

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

export interface EmailOptions {
  host: string;
  port: number;
  ignoreTLS: boolean;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface Config {
  server: ServerOptions;
  mqtt: ServerOptions;
  mysql: DatabaseOptions;
  jwt: jwtOptions;
  web: WebOptions;
  email: EmailOptions;
}

export const getEnv = () => {
  return process.env.NODE_ENV as "DEV" | "PROD";
};

export const isDev = () => getEnv() === "DEV";
export const getConfig = () => {
  const env = getEnv();
  const yamlPath = path.join(process.cwd(), `./env/env.${env.toLowerCase()}.yaml`);
  const file = fs.readFileSync(yamlPath, "utf8");
  const a = parse(file) as Config;

  const host = networkInterfaces()["WLAN"]![3].address;

  a.mqtt.host = host;
  a.server.host = host;
  a.web.host = host;

  return a;
};
