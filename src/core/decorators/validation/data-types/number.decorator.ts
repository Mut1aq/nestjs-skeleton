import { applyDecorators } from '@nestjs/common';
import { NumberDataTypeValidation } from '@shared/interfaces/validation/number-data-type-validation.interface';
import { checkNullability } from '@shared/util/check-nullability.util';
import { Type } from 'class-transformer';
import { Min, Max, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export const NumberDecorator = (options: NumberDataTypeValidation) => {
  const { max, min, property, each, isInt, isNotEmpty, isOptional } = options;
  const validators = [
    Type(() => Number),
    Min(min, {
      message: i18nValidationMessage('validation.min', {
        property,
        min,
      }),
      each,
    }),
    Max(max, {
      message: i18nValidationMessage('validation.max', {
        property,
        max,
      }),
      each,
    }),
  ];

  if (checkNullability(isInt)) {
    validators.push(
      IsInt({
        message: i18nValidationMessage('validation.isInt', {
          property,
        }),
        each,
      }),
    );
  }
  if (checkNullability(isNotEmpty)) {
    validators.push(
      IsNotEmpty({
        message: i18nValidationMessage('validation.isNotEmpty', {
          property,
        }),
        each,
      }),
    );
  }
  if (checkNullability(isOptional)) {
    validators.push(IsOptional({ each }));
  }

  return applyDecorators(...validators);
};
