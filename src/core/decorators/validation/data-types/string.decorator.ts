import { applyDecorators } from '@nestjs/common';
import { StringDataTypeValidation } from '@shared/interfaces/validation/string-data-type-validation.interface';
import { checkNullability } from '@shared/util/check-nullability.util';
import { Transform } from 'class-transformer';
import { MinLength, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export const StringDecorator = (options: StringDataTypeValidation) => {
  const {
    maxLength,
    minLength,
    property,
    each,
    isNotEmpty,
    isOptional,
    lowercase,
    uppercase,
  } = options;
  const validators = [
    MinLength(minLength, {
      message: i18nValidationMessage('validation.minLength', {
        property,
        characters: minLength,
      }),
      each,
    }),
    MaxLength(maxLength, {
      message: i18nValidationMessage('validation.maxLength', {
        property,
        characters: maxLength,
      }),
      each,
    }),
    Transform((param) => param?.value?.trim()),
  ];

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
  if (checkNullability(lowercase)) {
    validators.push(Transform((param) => param?.value?.toLowercase()));
  }
  if (checkNullability(uppercase)) {
    validators.push(Transform((param) => param?.value?.toUppercase()));
  }

  return applyDecorators(...validators);
};
