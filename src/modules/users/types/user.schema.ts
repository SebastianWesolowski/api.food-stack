import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const UserPreferencesSchema = z.object({
  dietType: z.string(),
  restrictions: z.array(z.string()).optional(),
  preferences: z.array(z.string()).optional(),
});

export const UserSchema = z.strictObject({
  id: z.string().uuid(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(['user', 'admin']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  preferences: UserPreferencesSchema,
});

export class UserDto extends createZodDto(UserSchema) {}
export type UserType = z.infer<typeof UserSchema>;

export const GetUsersResponseSchema = z.strictObject({
  users: z.array(UserSchema),
});

export class GetUsersResponseDto extends createZodDto(GetUsersResponseSchema) {}
export type GetUsersResponseType = z.infer<typeof GetUsersResponseSchema>;

export const GetUserByIdRequestSchema = z.strictObject({
  id: z.string().uuid(),
});

export class GetUserByIdRequestDto extends createZodDto(
  GetUserByIdRequestSchema,
) {}
export type GetUserByIdRequestType = z.infer<typeof GetUserByIdRequestSchema>;
