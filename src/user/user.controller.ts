import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { validate as isUuid } from 'uuid';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    const users = this.userService.getAll();
    return users;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const user = this.userService.getById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const { password, ...rest } = user;
    return rest;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  updateUserPassword(
    @Param('id') id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const user = this.userService.updatePassword(id, updateUserDto);

    if (!user) {
      console.log('User not found. Throwing 404.');
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const user = this.userService.getById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.userService.delete(id);
  }
}
