import { IsString } from 'class-validator';

export class CreateBaseMapDto {
  @IsString()
  name!: string;

  @IsString()
  url!: string;
}
