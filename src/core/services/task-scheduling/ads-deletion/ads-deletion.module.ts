import { AdsModule } from '@modules/ads/ads.module';
import { Module, forwardRef } from '@nestjs/common';
import { LoggerModule } from '@services/logger/logger.module';
import { AdsDeletionService } from './ads-deletion.service';

@Module({
  controllers: [],
  providers: [AdsDeletionService],
  imports: [forwardRef(() => AdsModule), LoggerModule],
  exports: [AdsDeletionService],
})
export class AdsDeletionModule {}
