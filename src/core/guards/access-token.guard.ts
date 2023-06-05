import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '@decorators/auth/public.decorator';
import {
  checkNullability,
  checkObjectNullability,
} from '@shared/util/check-nullability.util';
import { TokenPayload } from '@shared/interfaces/api/token-payload.interface';
import { Request } from '@shared/interfaces/api/request.interface';
import { CacheService } from '../services/cache/cache.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly cacheService: CacheService,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = this.getRequest(context);

    if (isPublic) return true;

    try {
      const token = this.getToken(request);
      const user = this.jwtService.verify<TokenPayload>(token);
      request.user = user;

      const isLoggedIn = await this.cacheService.hgetByKey(
        user.sub.toString(),
        'accessToken',
      );

      if (checkNullability(isLoggedIn) && checkObjectNullability(user))
        return true;

      throw new HttpException(
        'auth.errors.unauthenticated',
        HttpStatus.UNAUTHORIZED,
      );
    } catch (e) {
      throw new HttpException(
        'auth.errors.unauthenticated',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  protected getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest();
  }

  protected getToken(request: Request): string {
    const authorization = request.headers['authorization'];
    if (!authorization || Array.isArray(authorization)) {
      throw new Error('Invalid Authorization Header');
    }
    const [_, token] = authorization.split(' ');
    return token;
  }
}
