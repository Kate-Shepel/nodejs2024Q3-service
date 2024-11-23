import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async login(login: string, password: string) {
    const user = await this.userService.findByLogin(login);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid login or password.');
    }

    const payload = { userId: user.id, login: user.login };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    return {
      accessToken,
    };
  }
}
