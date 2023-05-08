import { UserType } from '@services/logger/logger.interface';
import { Role } from '../enums/role.enum';

export const roleFinder = (role: number): UserType => {
  switch (role) {
    case Role.ADMIN:
      return 'ADMIN';

    default:
      return 'DEFAULT';
  }
};
