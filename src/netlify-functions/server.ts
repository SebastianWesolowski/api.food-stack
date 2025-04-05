// src/netlify-functions/server.ts
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Handler } from '@netlify/functions';
import serverless from 'serverless-http';
import { AppModule } from '../app.module';
import { ZodValidationFilter } from '../common/filters/zod-validation.filter';
import { ApiResponseInterceptor } from '../common/interceptors/api-response.interceptor';

let cachedApp: any;

async function bootstrapServer() {
  if (cachedApp) {
    return cachedApp;
  }

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new ZodValidationFilter(configService));

  app.enableCors();

  // Swagger tylko dla lokalnego środowiska
  if (process.env.NODE_ENV !== 'production') {
    const options = {
      explorer: true,
    };

    const config = new DocumentBuilder()
      .setTitle('FoodStack API')
      .setDescription('API dokumentacja dla FoodStack')
      .setVersion('1.0')
      .addTag('foodstack')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, options);
  }

  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();

  cachedApp = serverless(expressApp);
  return cachedApp;
}

export const handler: Handler = async (event, context) => {
  const serverlessHandler = await bootstrapServer();
  return serverlessHandler(event, context);
};
