import { IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { FilterQueryDto } from 'src/shared/dtos/filter-query.dto';

export class FilterUsersDto extends FilterQueryDto {
  @IsOptional()
  @IsString()
  readonly startDate?: string;

  @IsOptional()
  @IsString()
  readonly endDate?: string;

  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Phone Number',
    }),
  })
  readonly phoneNumber?: string;

  @IsOptional()
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Full Name',
    }),
  })
  readonly fullName?: string;
}
