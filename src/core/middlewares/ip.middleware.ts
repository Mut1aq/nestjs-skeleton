import { Injectable, NestMiddleware } from '@nestjs/common';
import { getClientIp } from '@supercharge/request-ip';
import { NextFunction, Response } from 'express';
import { Request } from '@shared/interfaces/general/request.interface';

@Injectable()
export class RealIPMiddleware implements NestMiddleware {
  use(request: Request, _response: Response, next: NextFunction) {
    request.userIP = getClientIp(request) ?? '';
    next();
  }
}
