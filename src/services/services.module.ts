import { Module } from '@nestjs/common';
import { CaslModule } from './casl/casl.module';
import { DynamicTranslationService } from './dynamic-translation.service';
import { ServerLogger } from './logger/server-logger';

@Module({
  controllers: [],
  providers: [ServerLogger, DynamicTranslationService],
  imports: [CaslModule],
  exports: [DynamicTranslationService],
})
export class ServicesModule {}
