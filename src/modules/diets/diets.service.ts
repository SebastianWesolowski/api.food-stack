import { Injectable } from '@nestjs/common';
import { CompletionType, LLMService } from 's-nestjs-module-llm';
import { v4 as uuidv4 } from 'uuid';
import { generateDietPromptSystem } from '@/modules/diets/prompt/generateDiet.prompt';
import {
  DietPlan,
  DietPlanSchema,
  GeneratedDietType,
  GenerateDietRequestDto,
} from './types/diet.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class DietsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly llmService: LLMService,
  ) {}

  async generateDiet({
    userId,
    numberOfDays,
  }: GenerateDietRequestDto): Promise<GeneratedDietType[]> {
    const userData = this.usersService.getUserById({ id: userId });

    if (!userData) {
      throw new Error('Nie znaleziono preferencji użytkownika');
    }

    const llmInput: CompletionType = {
      messages: [
        {
          role: 'system',
          content: generateDietPromptSystem,
        },
        {
          role: 'user',
          content: `User data: ${JSON.stringify(userData)}`,
        },
      ],
      model: 'gpt-4o-mini',
      stream: false,
      jsonMode: true,
    };

    const diets = await Promise.all(
      Array.from({ length: numberOfDays }, async (_, index) => {
        const response = await this.llmService.completion(llmInput);

        let dietPlan: DietPlan;
        try {
          const parsed = JSON.parse(
            response.choices[0].message.content || '{}',
          );
          dietPlan = DietPlanSchema.parse(parsed);
        } catch {
          dietPlan = DietPlanSchema.parse({});
        }

        return {
          dietId: uuidv4(),
          name: `Dieta na dzień ${index + 1}`,
          description: `Plan diety ${userData.preferences.dietType} na dzień ${index + 1}`,
          dietPlan,
          assignedDate: new Date(
            Date.now() + index * 24 * 60 * 60 * 1000,
          ).toISOString(),
        };
      }),
    );

    return diets;
  }
}
