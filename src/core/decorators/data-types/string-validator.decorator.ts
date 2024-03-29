import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptions } from '@nestjs/swagger';
import { StringDataTypeValidation } from '@shared/interfaces/validation/string-data-type-validation.interface';
import { checkNullability } from '@shared/util/check-nullability.util';
import { Transform } from 'class-transformer';
import {
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export const StringValidator = (options: StringDataTypeValidation) => {
  const {
    maxLength,
    minLength,
    property,
    each,
    isNotEmpty,
    isOptional,
    lowercase,
    uppercase,
    name,
    example,
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
    IsString({
      message: i18nValidationMessage('validation.isString', {
        property,
      }),
      each,
    }),
  ];

  const APIPropertyOptions: ApiPropertyOptions = {};
  APIPropertyOptions.name = name;
  APIPropertyOptions.maxLength = maxLength;
  APIPropertyOptions.minLength = minLength;
  APIPropertyOptions.type = String;
  APIPropertyOptions.example = example;

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
  if (checkNullability(lowercase)) {
    validators.push(Transform((param) => param?.value?.toLowercase()));
  }
  if (checkNullability(uppercase)) {
    validators.push(Transform((param) => param?.value?.toUppercase()));
  }

  APIPropertyOptions.isArray = each === true;
  APIPropertyOptions.title = property;

  return applyDecorators(...validators);
};
