import { v4 as uuidv4 } from 'uuid';
import { GeneratedDietType } from '@/modules/diets/types/diet.schema';

export const mockDiets: GeneratedDietType[] = [
  {
    dietId: uuidv4(),
    name: 'Dieta 1',
    description: 'Opis diety 1',
    dietPlan: {
      meals: {
        breakfast: {
          name: 'Kanapka z szynką',
          description: 'Kanapka z szynką',
          instructions:
            'Rozmieszczaj szynkę w pojemniku i wlej mleko. Włącz mikrofalówkę na 2 minuty. Podaj z dodatkiem masła i cebuli.',
          ingredients: [{ name: 'Szynka', quantity: '100g' }],
        },
        lunch: {
          name: 'Kanapka z szynką',
          description: 'Kanapka z szynką',
          instructions:
            'Rozmieszczaj szynkę w pojemniku i wlej mleko. Włącz mikrofalówkę na 2 minuty. Podaj z dodatkiem masła i cebuli.',
          ingredients: [{ name: 'Szynka', quantity: '100g' }],
        },
        dinner: {
          name: 'Kanapka z szynką',
          description: 'Kanapka z szynką',
          instructions:
            'Rozmieszczaj szynkę w pojemniku i wlej mleko. Włącz mikrofalówkę na 2 minuty. Podaj z dodatkiem masła i cebuli.',
          ingredients: [{ name: 'Szynka', quantity: '100g' }],
        },
      },
    },
    assignedDate: new Date().toISOString(),
  },
];
