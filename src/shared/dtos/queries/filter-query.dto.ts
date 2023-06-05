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
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Skip',
    }),
  })
  @IsInt()
  @Min(0)
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
  @Min(0)
  limit!: number;

  @ApiProperty({
    description: 'Order by date, for filtering, can be either "asc", "desc"',
    name: 'orderByDate',
    isArray: false,

    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  orderByDate?: string;
}
