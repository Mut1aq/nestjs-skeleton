import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from 'src/core/filters/custom-exception.filter';
import { CustomThrottlerGuard } from 'src/core/guards/custom-throttler.guard';
import { AccessTokenGuard } from 'src/core/guards/access-token.guard';
import { TranslationInterceptor } from 'src/core/interceptors/translation.interceptor';
import { RoleGuard } from 'src/core/guards/role.guard';

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

export const GlobalRoleGuard = {
  provide: APP_GUARD,
  useClass: RoleGuard,
};
