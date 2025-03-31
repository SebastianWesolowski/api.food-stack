import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodValidate } from '@/common/decorators/zod-validate.decorator';
import { dietExamples } from '@/modules/diets/__mocks__/diet.examples';
import { DietsService } from './diets.service';
import {
  GeneratedDietSchema,
  GeneratedDietType,
  GenerateDietRequestDto,
  GenerateDietRequestSchema,
  GenerateDietRequestType,
} from './types/diet.schema';

@ApiTags('Diets')
@Controller('diets')
export class DietsController {
  constructor(private readonly dietsService: DietsService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generuje plan diety' })
  @ApiBody({
    type: GenerateDietRequestDto,
    examples: dietExamples,
  })
  @ApiResponse({
    status: 400,
    description: 'Nieprawidłowe dane wejściowe',
  })
  @ZodValidate(GenerateDietRequestSchema, GeneratedDietSchema.array())
  generateDiet(@Body() data: GenerateDietRequestType): GeneratedDietType[] {
    return this.dietsService.generateDiet(data);
  }
}
