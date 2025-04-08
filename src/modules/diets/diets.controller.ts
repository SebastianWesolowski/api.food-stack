import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodValidate } from '@/common/decorators/zod-validate.decorator';
import { AddAssignedDateInterceptor } from '@/common/interceptors/add-assigned-date.interceptor';
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
  @UseInterceptors(AddAssignedDateInterceptor)
  @ZodValidate(GenerateDietRequestSchema, GeneratedDietSchema.array())
  async generateDiet(
    @Body() data: GenerateDietRequestType,
  ): Promise<GeneratedDietType[]> {
    return await this.dietsService.generateDiet(data);
  }
}
