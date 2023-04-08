import { Allow, IsNotEmpty, IsString } from 'class-validator';
import { Geometry, Properties } from '../interfaces/geo-json.interface';

export class CreateFeatureDto {
  @Allow()
  @IsNotEmpty()
  properties!: Properties;

  @IsString()
  @IsNotEmpty()
  type!: string;

  @Allow()
  @IsNotEmpty()
  geometry!: Geometry;
}
