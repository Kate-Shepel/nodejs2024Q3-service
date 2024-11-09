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
    const user = this.users.find(user => user.id === id) || null;
    console.log('Finding user by ID:', id, 'Result:', user);
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
    console.log('Attempting to update password for ID:', id);
  
    const user = this.getById(id);
    console.log('User found in updatePassword:', user);
  
    if (!user) {
      console.log('User not found in updatePassword. Returning null.');
      return null;
    }
  
    if (user.password !== updateUserDto.oldPassword) {
      console.log('Old password does not match. Throwing ForbiddenException.');
      throw new ForbiddenException('Old password is incorrect');
    }
  
    user.password = updateUserDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
  
    console.log('Password updated successfully in updatePassword:', user);
    return { ...user, password: undefined };
  }

  delete(id: string): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}
