// Serwis do obsługi danych użytkowników
import { Injectable } from '@nestjs/common';
import {
  GetUserByIdRequestType,
  UserType,
} from '@/modules/users/types/user.schema';
import { mockUsers } from '@modules/users/__mocks__/user.mocks';

@Injectable()
export class UsersService {
  private users: UserType[] = [...mockUsers];

  getUsers(): UserType[] {
    return this.users;
  }

  getUserById(params: GetUserByIdRequestType): UserType {
    const user = this.users.find((user) => user.id === params.id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
