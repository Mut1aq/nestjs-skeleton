import { SetMetadata } from '@nestjs/common';
import { Role } from '../../../shared/enums/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
