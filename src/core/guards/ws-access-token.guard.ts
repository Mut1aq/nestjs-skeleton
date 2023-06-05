import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '@decorators/auth/public.decorator';
import {
  checkNullability,
  checkObjectNullability,
} from '@shared/util/check-nullability.util';
import { WsException } from '@nestjs/websockets';
import { Socket } from '@modules/chat/interfaces/socket.interface';
import { TokenPayload } from '@shared/interfaces/api/token-payload.interface';
import { CacheService } from '../services/cache/cache.service';

@Injectable()
export class WSAccessTokenGuard implements CanActivate {
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

    const socket = this.getSocket(context);

    if (isPublic) return true;

    try {
      const token = this.getToken(socket);
      const user = this.jwtService.verify<TokenPayload>(token);
      socket.data.user = user;

      const isLoggedIn = await this.cacheService.hgetByKey(
        user.sub.toString(),
        'accessToken',
      );

      if (
        (checkNullability(isLoggedIn) && checkObjectNullability(user)) ||
        isPublic
      )
        return true;

      throw new WsException('auth.errors.unauthenticated');
    } catch (e) {
      throw new WsException('auth.errors.unauthenticated');
    }
  }

  protected getSocket(context: ExecutionContext): Socket {
    return context.switchToWs().getClient<Socket>();
  }

  protected getToken(socket: Socket): string {
    const authorization = socket.handshake.auth['token'];
    if (!authorization || Array.isArray(authorization)) {
      throw new Error('Invalid Authorization Header');
    }
    return authorization;
  }
}
