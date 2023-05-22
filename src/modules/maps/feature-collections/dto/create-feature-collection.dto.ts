import { StringDecorator } from '@decorators/validation/data-types/string.decorator';
import {
  Crs,
  Feature,
} from '@modules/maps/interfaces/feature-collection.interface';
import { Allow } from 'class-validator';

export class CreateFeatureCollectionDto {
  @StringDecorator({ property: 'Type', minLength: 0, maxLength: 100 })
  type!: string;

  @StringDecorator({ property: 'Name', minLength: 0, maxLength: 100 })
  name!: string;

  @Allow()
  features!: Feature[];

  @Allow()
  crs!: Crs;
}
