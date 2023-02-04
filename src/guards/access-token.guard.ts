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
import { IS_PUBLIC_KEY } from 'src/shared/decorators/auth/public.decorator';
import { Cache } from 'cache-manager';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const request = this.getRequest<
      IncomingMessage & { user: Record<string, unknown> }
    >(context);

    try {
      const token = this.getToken(request);
      const user = this.jwtService.verify(token);
      request.user = user;

      const isLoggedIn = await this.cacheManager.get(user.sub);

      if (isLoggedIn) return true;

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
