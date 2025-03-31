import { Module } from '@nestjs/common';
import { DietsController } from './diets.controller';
import { DietsService } from './diets.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [DietsService],
  controllers: [DietsController],
  exports: [DietsService],
})
export class DietsModule {}
