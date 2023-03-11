import {
  CACHE_MANAGER,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'http';
import { Cache } from 'cache-manager';
import { IS_PUBLIC_KEY } from 'src/shared/decorators/auth/public.decorator';
import {
  checkNullability,
  checkObjectNullability,
} from 'src/shared/util/check-nullability.util';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) private readonly redis: Cache,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = this.getRequest<
      IncomingMessage & { user: Record<string, unknown> }
    >(context);

    if (isPublic) return true;

    try {
      const token = this.getToken(request);
      const user = this.jwtService.verify(token);
      request.user = user;

      const isLoggedIn = await this.redis.get(user.sub);

      if (
        (checkNullability(isLoggedIn) && checkObjectNullability(user)) ||
        isPublic
      )
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

  protected getRequest<T>(context: ExecutionContext): T {
    return context.switchToHttp().getRequest();
  }

  protected getToken(request: {
    headers: Record<string, string | string[] | undefined>;
  }): string {
    const authorization = request.headers['authorization'];
    if (!authorization || Array.isArray(authorization)) {
      throw new Error('Invalid Authorization Header');
    }
    const [_, token] = authorization.split(' ');
    return token;
  }
}
