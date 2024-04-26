import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { getConfig } from "@/utils";
import { IntegrateFilter } from "@server/src/filter";
import { IntegrateInterceptor } from "@server/src/interceptor";

const config = getConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new IntegrateFilter());
  app.useGlobalInterceptors(new IntegrateInterceptor());
  app.enableCors();
  await app.listen(config.server.port);
  console.log(`nest服务运行在: http://${config.server.host}:${config.server.port}/`);
}

bootstrap();
