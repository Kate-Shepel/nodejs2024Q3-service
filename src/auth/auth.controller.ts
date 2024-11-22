import {
  Controller,
  Post,
  Body,
  BadRequestException
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('Login and password are required.');
    }

    return this.authService.signup(createUserDto);
  }

  @Post('login')
  async login(@Body() { login, password }: { login: string; password: string }) {
    if (!login || !password) {
      throw new BadRequestException('Login and password are required.');
    }

    return this.authService.login(login, password);
  }
}
