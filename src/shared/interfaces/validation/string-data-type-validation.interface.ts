import { SharedDataTypeValidation } from './shared-data-type-validation.interface';

export interface StringDataTypeValidation extends SharedDataTypeValidation {
  maxLength: number;
  minLength: number;
  lowercase?: boolean;
  uppercase?: boolean;
}
