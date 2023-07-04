import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ServerAPILogger } from '@services/logger/server-api.logger';
import { everyHourFromSixToTen } from '@shared/constants/general/cron-expressions.constants';

/**
 * TODO: When i get paid enough make it so if a day has no appointments, skip the rest of the day
 */
@Injectable()
export class PromotedUsersCheckService {
  constructor(private serverAPILogger: ServerAPILogger) {}

  @Cron(everyHourFromSixToTen)
  async demoteExpiredPromotedUsers() {
    this.serverAPILogger.log(
      'Checked Expired Users',
      'PromotedUsersCheckService',
    );
  }
}
