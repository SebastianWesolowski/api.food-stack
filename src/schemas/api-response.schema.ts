// Schema dla odpowiedzi API
import { z } from 'zod';
import { UserSchema } from './user.schema';

export const ApiResponseSchema = z.object({
  message: z.string(),
  timestamp: z.string().datetime(),
  version: z.string(),
  data: z.object({
    users: z.array(UserSchema),
    usersCount: z.number().int().nonnegative(),
  }),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

export default ApiResponseSchema;
