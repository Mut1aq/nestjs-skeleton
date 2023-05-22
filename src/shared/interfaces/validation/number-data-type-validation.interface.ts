import { SharedDataTypeValidation } from './shared-data-type-validation.interface';

export interface NumberDataTypeValidation extends SharedDataTypeValidation {
  max: number;
  min: number;
  isInt?: boolean;
}
