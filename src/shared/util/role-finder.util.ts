import { UserType } from '@services/logger/logger.interface';
import { Role } from '../enums/role.enum';

export const roleFinder = (role: number): UserType => {
  switch (role) {
    case Role.DOCTOR:
      return 'DOCTOR';
    case Role.SERVICE_PROVIDER:
      return 'SERVICE PROVIDER';

    default:
      return 'DEFAULT';
  }
};
