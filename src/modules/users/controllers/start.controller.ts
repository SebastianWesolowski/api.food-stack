// Kontroler z endpointem startowym
import { Controller, Get, Param } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidate } from '@common/decorators/zod-validate.decorator';
import { UserSchema } from '@modules/users/entities/user.schema';
import { UserService } from '@modules/users/services/user.service';

const StartDataSchema = z.object({
  users: z.array(UserSchema),
  usersCount: z.number().int().min(0),
});

@Controller('api')
export class StartController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getApiRoot() {
    return { message: 'API działa poprawnie' };
  }

  @Get('start')
  @ZodValidate(StartDataSchema)
  getStartData() {
    const users = this.userService.getUsers();
    return {
      users,
      usersCount: users.length,
    };
  }

  @Get('user/:id')
  @ZodValidate(UserSchema)
  getUserById(@Param('id') id: string) {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new Error('Nie znaleziono użytkownika');
    }
    return user;
  }
}
