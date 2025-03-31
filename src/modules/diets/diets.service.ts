import { Injectable } from '@nestjs/common';
import { mockDiets } from '@/modules/diets/__mocks__/diet.mocks';
import { GeneratedDietType, GenerateDietRequestDto } from './types/diet.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class DietsService {
  constructor(private readonly usersService: UsersService) {}

  generateDiet(data: GenerateDietRequestDto): GeneratedDietType[] {
    const userData = this.usersService.getUserById({ id: data.userId });

    if (!userData) {
      throw new Error('Nie znaleziono preferencji użytkownika');
    }

    //model llm

    return mockDiets;
  }
}
