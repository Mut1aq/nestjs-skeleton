import { Module } from '@nestjs/common';
import { DynamicTranslationService } from './dynamic-translation.service';
import { ServerAccessLogger } from './logger/server-access.logger';
import { ServerActionLogger } from './logger/server-action.logger';
import { ServerAPILogger } from './logger/server-api.logger';

@Module({
  controllers: [],
  providers: [
    DynamicTranslationService,
    ServerAPILogger,
    ServerAccessLogger,
    ServerActionLogger,
  ],
  imports: [],
  exports: [
    DynamicTranslationService,
    ServerAPILogger,
    ServerAccessLogger,
    ServerActionLogger,
  ],
})
export class ServicesModule {}
