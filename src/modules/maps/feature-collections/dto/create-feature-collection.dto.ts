import { StringDecorator } from '@decorators/data-types/string.decorator';
import {
  Crs,
  Feature,
} from '@modules/maps/interfaces/feature-collection.interface';
import { Allow } from 'class-validator';

export class CreateFeatureCollectionDto {
  @StringDecorator({
    property: 'Type',
    minLength: 0,
    maxLength: 100,
    name: 'type',
  })
  type!: string;

  @StringDecorator({
    property: 'Name',
    minLength: 0,
    maxLength: 100,
    name: 'name',
  })
  name!: string;

  @Allow()
  features!: Feature[];

  @Allow()
  crs!: Crs;
}
