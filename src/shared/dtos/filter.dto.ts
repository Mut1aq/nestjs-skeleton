import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FilterQueryDto {
  @ApiProperty({
    description: 'This is for pagination',
    name: 'skip',
    required: false,
    type: Number,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip?: number | undefined;

  @ApiProperty({
    description: 'This is for pagination',
    name: 'limit',
    required: false,
    type: Number,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  limit?: number | undefined;

  @ApiProperty({
    description: 'Order by date, for filtering, can be either "asc", "desc"',
    name: 'orderByDate',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  orderByDate?: string | undefined;
}
