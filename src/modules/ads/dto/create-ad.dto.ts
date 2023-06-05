import { ApiProperty } from '@nestjs/swagger';
import { CloudinaryObject } from '@shared/interfaces/general/cloudinary-object.interface';
import { Allow, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateAdDto {
  //*******************************************/

  @Allow()
  image!: CloudinaryObject;

  //*******************************************/

  @ApiProperty({
    description: 'Date of ad expiry',
    example: '2023-01-26T13:51',
    isArray: false,
    name: 'expiry',

    required: true,
    title: 'Ad Expiry',
    type: String,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Ad Expiry',
    }),
  })
  expiry!: string;
}
