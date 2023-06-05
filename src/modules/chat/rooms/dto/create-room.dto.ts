// import {
//   IsMongoId,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   MaxLength,
//   MinLength,
// } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRoomDto {
  // @MaxLength(300, {
  //   message: '1',
  // })
  // @MinLength(3, {
  //   message: '2',
  // })
  // @IsString({
  //   message: '3',
  // })
  // @IsNotEmpty({
  //   message: '4',
  // })
  // @IsOptional()
  // @IsNotEmpty()
  // name!: string;

  //*******************************************/

  // @IsMongoId({
  //   message: '5',
  // })
  // @IsNotEmpty({
  //   message: '6',
  // })
  author!: Types.ObjectId;

  //*******************************************/

  // @IsMongoId({
  //   message: '7',
  // })
  // @IsNotEmpty({
  //   message: '8',
  // })
  secondParty!: Types.ObjectId;
}
