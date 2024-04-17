import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { IntegrateFilter } from "@/src/filter";
import { IntegrateInterceptor } from "@/src/interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new IntegrateFilter());
  app.useGlobalInterceptors(new IntegrateInterceptor());
  await app.listen(3000);
  console.log("nest服务运行在: http://localhost:3000/");
}

bootstrap();
