import { Allow, IsString } from 'class-validator';
import { Crs } from '../interfaces/geo-json.interface';

export class CreateFeatureCollectionDto {
  @IsString()
  name!: string;

  @IsString()
  type!: string;

  @Allow()
  crs!: Crs;
}
