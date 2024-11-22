import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<Omit<UserEntity, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map(({ password, ...rest }) => ({
      ...rest,
      createdAt: Number(rest.createdAt),
      updatedAt: Number(rest.updatedAt),
    }));
  }

  async getById(id: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;

    return {
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };
  }

  async create(createUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    const newUser = this.userRepository.create({
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await this.userRepository.save(newUser);

    return {
      ...newUser,
      createdAt: Number(newUser.createdAt),
      updatedAt: Number(newUser.updatedAt),
      password: undefined,
    };
  }

  async updatePassword(
    id: string,
    updateUserDto: UpdatePasswordDto,
  ): Promise<Partial<UserEntity> | null> {
    const user = await this.getById(id);

    if (!user) {
      return null;
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = updateUserDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    await this.userRepository.save(user);

    return {
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
      password: undefined,
    };
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async findByLogin(login: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ login });
  }
}
