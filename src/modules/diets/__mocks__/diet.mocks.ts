import { v4 as uuidv4 } from 'uuid';
import { GeneratedDietType } from '@/modules/diets/types/diet.schema';

export const mockDiets: GeneratedDietType[] = [
  {
    dietId: uuidv4(),
    name: 'Dieta 1',
    description: 'Opis diety 1',
    ingredients: ['Składnik 1', 'Składnik 2'],
    instructions: ['Instrukcja 1', 'Instrukcja 2'],
  },
  {
    dietId: uuidv4(),
    name: 'Dieta 2',
    description: 'Opis diety 1',
    ingredients: ['Składnik 1', 'Składnik 2'],
    instructions: ['Instrukcja 1', 'Instrukcja 2'],
  },
];
