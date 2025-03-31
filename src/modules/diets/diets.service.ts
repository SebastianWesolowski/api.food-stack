import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { GeneratedDietType, GenerateDietRequestDto } from './types/diet.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class DietsService {
  constructor(private readonly usersService: UsersService) {}

  generateDiet({
    userId,
    numberOfDays,
  }: GenerateDietRequestDto): GeneratedDietType[] {
    const userData = this.usersService.getUserById({ id: userId });

    if (!userData) {
      throw new Error('Nie znaleziono preferencji użytkownika');
    }

    // const llm = new LLMModule();

    // const response = (await llm.completion(
    //   [
    //     summarizationPrompt,
    //     {
    //       role: 'user',
    //       content: 'Please create/update our conversation summary.',
    //     },
    //   ],
    //   'gpt-4o-mini',
    //   false,
    // )) as OpenAI.Chat.Completions.ChatCompletion;
    // return response.choices[0].message.content ?? 'No conversation history';

    const diets: GeneratedDietType[] = Array.from(
      { length: numberOfDays },
      (_, index) => ({
        dietId: uuidv4(),
        name: `Dieta na dzień ${index + 1}`,
        description: `Plan diety ${userData.preferences.dietType} na dzień ${index + 1}`,
        ingredients: [
          ...(userData.preferences.restrictions?.map((r) => `Zgodne z ${r}`) ||
            []),
          ...(userData.preferences.preferences?.map(
            (p) => `Uwzględniono ${p}`,
          ) || []),
        ],
        instructions: [
          `Przygotowanie diety ${userData.preferences.dietType}`,
          'Instrukcje szczegółowe...',
        ],
      }),
    );

    return diets;
  }
}
