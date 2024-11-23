import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const routePath = request.route.path;

    if (routePath === '/auth/signup' || routePath === '/auth/login') {
      return true;
    }

    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header missing or invalid',
      );
    }

    const userTocken = authHeader.split(' ')[1];

    try {
      const decodedToken = this.jwtService.verify(userTocken, {
        secret: process.env.JWT_SECRET_KEY,
      });

      request.user = decodedToken;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
