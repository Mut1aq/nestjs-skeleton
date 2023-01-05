import { Module } from '@nestjs/common';
import { DynamicTranslationService } from './dynamic-translation.service';
import { HealthModule } from './health/health.module';
import { ServerLogger } from './logger/server-logger';

@Module({
  controllers: [],
  providers: [ServerLogger, DynamicTranslationService],
  imports: [HealthModule],
  exports: [DynamicTranslationService, ServerLogger, HealthModule],
})
export class ServicesModule {}
