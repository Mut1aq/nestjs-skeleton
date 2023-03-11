import { PartialType } from '@nestjs/mapped-types';
import { Allow } from 'class-validator';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @Allow()
  refreshToken!: string | null;
}
