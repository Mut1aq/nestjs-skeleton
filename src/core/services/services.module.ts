import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';

@Module({
  controllers: [],
  providers: [TranslationService],
  imports: [],
  exports: [TranslationService],
})
export class ServicesModule {}
