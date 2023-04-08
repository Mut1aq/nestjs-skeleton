import { Injectable } from '@nestjs/common';
import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(): void {
    throw new ThrottlerException('validation.throttlerError');
  }

  protected getTracker(request: Record<string, any>): string {
    return request.ips.length > 0 ? request.ips[0] : request.ip;
  }
}
