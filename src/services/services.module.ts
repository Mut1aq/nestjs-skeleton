import { Module } from '@nestjs/common';
 import { DynamicTranslationService } from './dynamic-translation.service';
import { ServerLogger } from './logger/server-logger';

@Module({
  controllers: [],
  providers: [ServerLogger, DynamicTranslationService],
  imports: [ ],
  exports: [DynamicTranslationService, ServerLogger],
})
export class ServicesModule {}
