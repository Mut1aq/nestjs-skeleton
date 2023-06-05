import { Module } from '@nestjs/common';
import { DynamicTranslationService } from './dynamic-translation.service';

@Module({
  controllers: [],
  providers: [DynamicTranslationService],
  imports: [],
  exports: [DynamicTranslationService],
})
export class ServicesModule {}
