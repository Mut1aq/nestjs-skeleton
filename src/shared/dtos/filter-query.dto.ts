import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class FilterQueryDto {
  @ApiProperty({
    description: 'How many documents you want to skip over',
    name: 'skip',
    isArray: false,
    required: false,
    type: Number,
    minimum: 0,
  })
  @IsInt({
    message: i18nValidationMessage('validation.isInt', {
      property: 'Skip',
    }),
  })
  @Min(0, {
    message: i18nValidationMessage('validation.min', {
      property: 'Skip',
      min: 0,
    }),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Skip',
    }),
  })
  skip!: number;

  @ApiProperty({
    description: 'To how many documents you want to limit the response',
    name: 'limit',
    isArray: false,
    required: false,
    type: Number,
    minimum: 0,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Limit',
    }),
  })
  @IsInt()
  @Min(0, {
    message: i18nValidationMessage('validation.min', {
      property: 'Limit',
      min: 0,
    }),
  })
  limit!: number;

  @ApiProperty({
    description: 'Order by date, for filtering, can be either "asc", "desc"',
    name: 'orderByDate',
    isArray: false,
    required: false,
    type: String,
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Order By Date',
    }),
  })
  @IsIn(['asc', 'desc'])
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Order By Date',
    }),
  })
  @IsOptional()
  orderByDate?: string;
}
