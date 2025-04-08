import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const MealIngredientSchema = z.object({
  name: z.string().default('Składnik podstawowy'),
  quantity: z.string().default('100g'),
});

export const MealSchema = z.object({
  name: z.string().default('Posiłek zastępczy'),
  description: z.string().default('Posiłek domyślny'),
  instructions: z.string().default('Brak instrukcji'),
  ingredients: z
    .array(MealIngredientSchema)
    .default([{ name: 'Składnik podstawowy', quantity: '100g' }]),
});

export const DietPlanSchema = z.object({
  meals: z
    .object({
      breakfast: MealSchema.default({}),
      lunch: MealSchema.default({}),
      dinner: MealSchema.default({}),
    })
    .default({}),
});

export type MealIngredient = z.infer<typeof MealIngredientSchema>;
export type Meal = z.infer<typeof MealSchema>;
export type DietPlan = z.infer<typeof DietPlanSchema>;

export const GeneratedDietSchema = z.strictObject({
  dietId: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  dietPlan: DietPlanSchema,
  assignedDate: z.string().optional(), // format YYYY-MM-DD
});
export class GeneratedDietDto extends createZodDto(GeneratedDietSchema) {}
export type GeneratedDietType = z.infer<typeof GeneratedDietSchema>;

export const GenerateDietRequestSchema = z.strictObject({
  userId: z.string().uuid(),
  numberOfDays: z.number().min(1).max(31),
});

export class GenerateDietRequestDto extends createZodDto(
  GenerateDietRequestSchema,
) {}

export type GenerateDietRequestType = z.infer<typeof GenerateDietRequestSchema>;
