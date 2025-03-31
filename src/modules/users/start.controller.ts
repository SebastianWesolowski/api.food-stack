// Kontroler z endpointem startowym
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { userExamples } from '@/modules/users/__mocks__/user.examples';
import { ZodValidate } from '@common/decorators/zod-validate.decorator';
import { UsersService } from '@modules/users/users.service';
import {
  GetUserByIdRequestDto,
  GetUserByIdRequestSchema,
  GetUserByIdRequestType,
  GetUsersResponseSchema,
  GetUsersResponseType,
  UserSchema,
  UserType,
} from './types/user.schema';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Pobiera wszystkich użytkowników' })
  @ApiResponse({ status: 400, description: 'Błąd walidacji' })
  @ZodValidate(undefined, GetUsersResponseSchema)
  getUsers(): GetUsersResponseType {
    const users = this.usersService.getUsers();
    return {
      users,
    };
  }

  @Post('get-by-id')
  @ApiOperation({ summary: 'Pobiera użytkownika po ID' })
  @ApiBody({ type: GetUserByIdRequestDto, examples: userExamples })
  @ApiResponse({ status: 400, description: 'Błąd walidacji' })
  @ApiResponse({ status: 404, description: 'Nie znaleziono użytkownika' })
  @ZodValidate(GetUserByIdRequestSchema, UserSchema)
  getUserById(@Body() params: GetUserByIdRequestType): UserType {
    return this.usersService.getUserById(params);
  }
}
