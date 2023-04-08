import { Type } from 'class-transformer';
import { IsArray, ArrayNotEmpty } from 'class-validator';
import { Feature } from '../entities/feature.entity';
import { CreateFeatureDto } from './create-feature.dto';

export class CreateFeaturesDto {
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => CreateFeatureDto)
  features!: Feature[];
}
