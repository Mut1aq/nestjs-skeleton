import { Feature } from '@modules/maps/interfaces/feature-collection.interface';
import { Allow } from 'class-validator';

export class CreateFeatureDto {
  @Allow()
  features!: Feature[];
}
