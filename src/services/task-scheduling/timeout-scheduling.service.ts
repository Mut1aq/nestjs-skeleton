import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Types } from 'mongoose';
// import { AdsService } from 'src/modules/all-categories/ads/ads.service';
import { ServerAPILogger } from '../logger/server-api.logger';

@Injectable()
export class TimeoutSchedulingService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly APILogger: ServerAPILogger, // private readonly adService: AdsService,
  ) {}

  /**
   *
   * @param name ID of the resource
   * @param milliseconds
   */
  dynamicTimeoutAdDeletion(name: Types.ObjectId, milliseconds: number = 30000) {
    const callback = () => {
      // this.adService.remove(name, '' as any);
      this.APILogger.warn(`Timeout ${name} executing after (${milliseconds})!`);
    };

    const timeout = setTimeout(callback, milliseconds);

    this.schedulerRegistry.addTimeout(name + '', timeout);
  }
}
