import { GenerateDietRequestDto } from '../types/diet.schema';

export const dietExamples: Record<string, { value: GenerateDietRequestDto }> = {
  'Przykład 1': {
    value: {
      userId: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      numberOfDays: 2,
    },
  },
  'Przykład 2': {
    value: {
      userId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
      numberOfDays: 7,
    },
  },
};
