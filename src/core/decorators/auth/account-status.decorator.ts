import { SetMetadata } from '@nestjs/common';
import { AccountStatus } from '@shared/enums/account-status.enum';

export const AccountStatuses = (...accountStatus: AccountStatus[]) =>
  SetMetadata('accountStatus', accountStatus);
