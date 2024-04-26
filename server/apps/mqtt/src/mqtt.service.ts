import { Inject, Injectable, Logger } from "@nestjs/common";
import { getConfig, isEmpty } from "@/utils";
import * as net from "net";
import Aedes, { createBroker, Client, AuthenticateError, PublishPacket, Subscription } from "aedes";
import { DevicesService } from "@lib/devices";
import { Devices } from "@lib/repository";
import { MsgService } from "@lib/msg";

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

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);
  private broker: Aedes;
  private readonly config = getConfig();

  @Inject(DevicesService)
  private readonly devicesService: DevicesService;
  @Inject(MsgService)
  private readonly msgService: MsgService;

  constructor() {
    // debug log
    // setTimeout(async () => {
    //   await this.devicesService.getMsgInfo("test");
    // }, 1000);

    this.broker = createBroker({
      connectTimeout: 5000
    });

    this.broker.authenticate = (...args) => this.onAuth(...args);
    this.broker.authorizePublish = (...args) => this.beforePublish(...args);
    this.broker.authorizeSubscribe = (...args) => this.beforeSubscribe(...args);

    this.broker.on("publish", (...args) => this.onPublish(...args));
    // this.broker.on("subscribe", (...args) => this.onSubscribe(...args));

    this.broker.on("client", (...args) => this.onConnect(...args));
    this.broker.on("clientDisconnect", (...args) => this.onDisconnect(...args));
  }

  private async onConnect(client: Client) {
    this.logger.log(`设备:{ ${client.id} } 建立连接`);

    //   设置该设备为在线状态
    const devicesId = client._parser.settings.password.toString();
    await this.devicesService.patchStatus(devicesId, true);
  }

  private async onDisconnect(client: Client) {
    this.logger.log(`设备:{ ${client.id} } 失去连接`);

    //   设置该设备为离线状态
    const devicesId = client._parser.settings.password.toString();
    await this.devicesService.patchStatus(devicesId, false);
  }

  private async onAuth(
    client: Client,
    username: Readonly<Buffer | string | undefined>,
    password: Readonly<Buffer | string | undefined>,
    done: (error: AuthenticateError | null, success: boolean | null) => void
  ) {
    const reject = () => done(null, false);
    const next = () => done(null, true);

    try {
      await this.devicesService.auth(username?.toString() ?? "", password?.toString() ?? "");

      this.logger.log(`${client.id} 身份验证成功！`);

      next();
    } catch (e) {
      this.logger.error(e.message);
      reject();
    }
  }

  private beforePublish(
    client: Client | null,
    packet: PublishPacket,
    next: (error?: Error | null) => void
  ) {
    // 修改发布的主题, 添加username（group id）作为前缀用于实现消息隔离
    packet.topic = `${client?._parser.settings.username}/${packet.topic}`;

    next();
  }

  private beforeSubscribe(
    client: Client | null,
    subscription: Subscription,
    next: (error?: Error | null, subscription?: Subscription | null) => void
  ) {
    // 设备订阅系统主题, 目前不做限定
    if (subscription.topic.startsWith("$SYS")) {
      this.logger.warn("警告， 当前未禁止设备订阅系统主题");
    }
    // 修改订阅的主题, 添加username（group id）作为前缀用于实现消息隔离
    subscription.topic = `${client?._parser.settings.username}/${subscription.topic}`;

    next(null, subscription);
  }

  private async onPublish(packet: PublishPacket, client: Client | null) {
    // 系统
    if (packet.topic.startsWith("$SYS")) {
      return;
    }

    const topics = packet.topic.split("/");
    const devicesId = client?._parser.settings.password.toString() as string;
    const jsonData = JSON.parse(packet.payload.toString());

    if (topics[1] === "attributes") {
      if (isEmpty(topics[2])) {
        await this.solveAttrPost(devicesId, jsonData);
      }
    }
  }

  private onSubscribe(subscriptions: Subscription[], client: Client | null) {}

  public async start() {
    net.createServer(this.broker.handle).listen(this.config.mqtt.port, "0.0.0.0", () => {
      this.logger.debug(
        `MQTT server running at: ${this.config.mqtt.host}:${this.config.mqtt.port}`
      );
    });
  }

  public async solveAttrPost(devicesId: Devices["id"], data: { [k: string]: string | number }) {
    console.log(devicesId, data);

    const keys = Object.keys(data);
    for (const key of keys) {
      await this.msgService.add(devicesId, {
        name: key,
        value: JSON.stringify(data[key])
      });
    }

    await this.devicesService.patchAttrPostTime(devicesId);

    // this.ms
  }
}
