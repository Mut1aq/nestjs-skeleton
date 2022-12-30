import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CustomExceptionFilter } from 'src/filters/custom-exception.filter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { TranslationInterceptor } from 'src/interceptors/translation.interceptor';
 
export const GlobalJwtAuthGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

export const GlobalCustomExceptionInterceptor = {
  provide: APP_INTERCEPTOR,
  useClass:  TranslationInterceptor,
};

export const GlobalCustomExceptionFilter = {
  provide: APP_FILTER,
  useClass: CustomExceptionFilter,
};

export const GlobalThrottlerGuard = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};
