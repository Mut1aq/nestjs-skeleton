import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateConnectedUserDto {
  @IsNotEmpty()
  @IsString()
  socketID!: string;

  @IsNotEmpty()
  @IsMongoId()
  user!: Types.ObjectId;
}
