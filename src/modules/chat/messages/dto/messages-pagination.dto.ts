// import { FilterQueryDto } from '@shared/dtos/queries/filter-query.dto';
// import { IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from 'mongoose';

export class MessagesPaginationDto {
  // @IsMongoId()
  // @IsNotEmpty()
  messagesContainerID!: Types.ObjectId;

  skip!: number;

  limit!: number;

  orderByDate!: string;
}
