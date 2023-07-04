import { StringValidator } from '@decorators/data-types/string-validator.decorator';
import {
  Crs,
  Feature,
} from '@modules/maps/interfaces/feature-collection.interface';
import { Allow } from 'class-validator';

export class CreateFeatureCollectionDto {
  @StringValidator({
    property: 'Type',
    minLength: 0,
    maxLength: 100,
    name: 'type',
  })
  type!: string;

  @StringValidator({
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
