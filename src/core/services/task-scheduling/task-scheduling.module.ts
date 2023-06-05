import { AdsModule } from '@modules/ads/ads.module';
import { Module, forwardRef } from '@nestjs/common';
import { LoggerModule } from '@services/logger/logger.module';
import { TimeoutSchedulingService } from './timeout-scheduling.service';

@Module({
  controllers: [],
  providers: [TimeoutSchedulingService],
  imports: [forwardRef(() => AdsModule), LoggerModule],
  exports: [TimeoutSchedulingService],
})
export class TaskSchedulingModule {}
