import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const GeneratedDietSchema = z.strictObject({
  dietId: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
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
