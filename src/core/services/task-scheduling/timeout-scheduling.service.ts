import { AdsService } from '@modules/ads/ads.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Types } from 'mongoose';
import { ServerAPILogger } from '../logger/server-api.logger';

@Injectable()
export class TimeoutSchedulingService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly serverAPILogger: ServerAPILogger,
    @Inject(forwardRef(() => AdsService))
    private readonly adService: AdsService,
  ) {}

  /**
   *
   * @param name ID of the resource
   * @param milliseconds
   */
  dynamicTimeoutAdDeletion(
    name: Types.ObjectId,
    milliseconds: number = 10000,
    deletionDate: string,
  ) {
    const callback = () => {
      this.adService.remove(name);
      this.serverAPILogger.log('Ad has been deleted');
    };

    this.serverAPILogger.warn(
      `Timeout ${name} executing after (${
        milliseconds < 0 ? 600000 * 6 * 24 : milliseconds
      }) ms (${deletionDate}) for Ad ${name}!`,
    );
    const timeout = setTimeout(
      callback,
      milliseconds < 0 ? 600000 * 6 * 24 : milliseconds,
    );

    this.schedulerRegistry.addTimeout(name + '', timeout);

    this.getTimeouts();
  }

  getTimeouts() {
    const timeouts = this.schedulerRegistry.getTimeouts();
    timeouts.forEach((key) => this.serverAPILogger.log(`Timeout: ${key}`));
  }
}
