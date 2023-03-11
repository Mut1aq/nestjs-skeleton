import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenPayload } from 'src/shared/interfaces/api/token-payload.interface';
import { checkNullability } from 'src/shared/util/check-nullability.util';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest<Request>();

    if (!roles) return true;

    if (!checkNullability(request.headers.authorization)) {
      throw new HttpException(
        'auth.errors.unauthorized',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = request.headers.authorization?.split(' ')?.[1] as string;
    const tokenDecoded = this.jwtService.decode(token) as TokenPayload;

    return this.matchRoles(roles, +tokenDecoded?.role);
  }

  matchRoles(requiredRoles: string[], userRole: number): boolean {
    if (requiredRoles.some((role) => [userRole].includes(+role))) return true;
    throw new HttpException(
      'auth.errors.unauthorized',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
