import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from 'src/filters/custom-exception.filter';
import { CustomThrottlerGuard } from 'src/guards/custom-throttler.guard';
import { AccessTokenGuard } from 'src/guards/access-token.guard';
import { TranslationInterceptor } from 'src/interceptors/translation.interceptor';

export const GlobalAccessTokenGuard = {
  provide: APP_GUARD,
  useClass: AccessTokenGuard,
};

export const GlobalCustomExceptionInterceptor = {
  provide: APP_INTERCEPTOR,
  useClass: TranslationInterceptor,
};

export const GlobalCustomExceptionFilter = {
  provide: APP_FILTER,
  useClass: CustomExceptionFilter,
};

export const GlobalThrottlerGuard = {
  provide: APP_GUARD,
  useClass: CustomThrottlerGuard,
};
