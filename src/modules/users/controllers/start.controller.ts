// Kontroler z endpointem startowym
import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiResponse,
  ApiResponseSchema,
} from '../../../schemas/api-response.schema';
import { UserSchema } from '../../../schemas/user.schema';
import { UserService } from '../services/user.service';

@Controller('api')
export class StartController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getApiRoot() {
    return { message: 'API działa poprawnie' };
  }

  @Get('start')
  getStartData(): ApiResponse {
    const users = this.userService.getUsers();

    // Walidujemy dane przez schemat Zod przed zwróceniem
    const validatedUsers = users
      .map((user) => {
        const result = UserSchema.safeParse(user);
        if (!result.success) {
          console.error(`Błąd walidacji użytkownika ${user.id}:`, result.error);
          return null;
        }
        return result.data;
      })
      .filter(Boolean);

    const response = {
      message: 'Witaj w API Food Stack!',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      data: {
        users: validatedUsers,
        usersCount: validatedUsers.length,
      },
    };

    // Walidacja całej odpowiedzi
    const result = ApiResponseSchema.safeParse(response);
    if (!result.success) {
      throw new Error('Nieprawidłowa struktura odpowiedzi API', {
        cause: result.error,
      });
    }

    return result.data;
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string) {
    const user = this.userService.getUserById(id);

    if (!user) {
      return { error: 'Nie znaleziono użytkownika' };
    }

    // Walidacja przez Zod
    const result = UserSchema.safeParse(user);
    if (!result.success) {
      return {
        error: 'Nieprawidłowe dane użytkownika',
        details: result.error.format(),
      };
    }

    return result.data;
  }
}
