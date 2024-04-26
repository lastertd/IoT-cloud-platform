import { NestFactory } from "@nestjs/core";
import { AppModule } from "./mqtt.module";
import { MqttService } from "@/apps/mqtt/src/mqtt.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const a = app.get(MqttService);

  await a.start();
}

bootstrap();
