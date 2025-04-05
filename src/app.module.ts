import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ZodValidationFilter } from './common/filters/zod-validation.filter';
import { ZodConfigModule } from './config/app.config';
import { DietsModule } from './modules/diets/diets.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ZodConfigModule, UsersModule, DietsModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ZodValidationFilter,
    },
  ],
})
export class AppModule {}
