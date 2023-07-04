import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { NumberDataTypeValidation } from '@shared/interfaces/validation/number-data-type-validation.interface';
import { checkNullability } from '@shared/util/check-nullability.util';
import { Type } from 'class-transformer';
import { Min, Max, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export const NumberValidator = (options: NumberDataTypeValidation) => {
  const {
    max,
    min,
    property,
    each,
    isInt,
    isNotEmpty,
    isOptional,
    name,
    example,
  } = options;
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

  const APIPropertyOptions: ApiPropertyOptions = {};
  APIPropertyOptions.name = name;
  APIPropertyOptions.maximum = max;
  APIPropertyOptions.minimum = min;
  APIPropertyOptions.type = Number;
  APIPropertyOptions.example = example;

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
    APIPropertyOptions.required = true;
  }
  if (checkNullability(isOptional)) {
    validators.push(IsOptional({ each }));
    APIPropertyOptions.required = false;
  }

  APIPropertyOptions.isArray = each === true;
  APIPropertyOptions.title = property;

  return applyDecorators(...validators, ApiProperty(APIPropertyOptions));
};
