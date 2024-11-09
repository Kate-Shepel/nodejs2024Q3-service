import { ForbiddenException, Injectable } from '@nestjs/common';

import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  getAll(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...rest }) => rest);
  }

  getById(id: string): User | null {
    const user = this.users.find((user) => user.id === id) || null;
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return { ...newUser, password: undefined };
  }

  updatePassword(id: string, updateUserDto: UpdatePasswordDto): User | null {
    const user = this.getById(id);

    if (!user) {
      return null;
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = updateUserDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return { ...user, password: undefined };
  }

  delete(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
