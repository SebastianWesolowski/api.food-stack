import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationFilter } from './common/filters/zod-validation.filter';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new ZodValidationFilter(configService));
  await app.listen(3000);
}

void bootstrap();
