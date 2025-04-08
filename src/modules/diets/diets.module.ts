import { Module, OnModuleInit } from '@nestjs/common';
import { LLMModule } from 's-nestjs-module-llm';
import { DietsController } from './diets.controller';
import { DietsService } from './diets.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    LLMModule.forRoot({
      apiKey: process.env.OPENAI_API_KEY || '',
      logPrompts: false,
    }),
  ],
  providers: [DietsService],
  controllers: [DietsController],
  exports: [DietsService],
})
export class DietsModule implements OnModuleInit {
  onModuleInit() {
    console.info(
      'OPENAI_API_KEY:',
      process.env.OPENAI_API_KEY?.substring(0, 5) + '...',
    );
  }
}
