import { PartialType } from '@nestjs/mapped-types';
import { CreateConnectedUserDto } from './create-connected-user.dto';

export class UpdateConnectedUserDto extends PartialType(CreateConnectedUserDto) {}
