export * from "aedes";

declare module "aedes" {
  interface Client {
    _parser: {
      settings: {
        cmd: string;
        retain: boolean;
        qos: number;
        dup: boolean;
        length: boolean;
        topic: any;
        payload: any;
        protocolId: string;
        protocolVersion: number;
        clean: boolean;
        keepalive: number;
        clientId: string;
        username: string;
        password: Buffer;
      };
    };
  }
}

export {}
