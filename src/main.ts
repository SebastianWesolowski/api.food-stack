import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { AppModule } from './app.module';
import { ZodValidationFilter } from './common/filters/zod-validation.filter';
import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const configService = app.get(ConfigService);
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  app.useGlobalFilters(new ZodValidationFilter(configService));

  const theme = new SwaggerTheme();
  const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  };

  const config = new DocumentBuilder()
    .setTitle('FoodStack API')
    .setDescription('API dokumentacja dla FoodStack')
    .setVersion('1.0')
    .addTag('foodstack')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, options);

  await app.listen(PORT);

  console.info(`Server is running on http://localhost:${PORT}`);
  console.info(`Docs are running on http://localhost:${PORT}/docs`);
}

void bootstrap();
