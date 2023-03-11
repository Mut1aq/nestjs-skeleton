import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxDate,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Match } from 'src/shared/decorators/validation/match.decorator';
import { PasswordContainsLowercaseLetter } from 'src/shared/decorators/validation/password/lowercase-letters.decorator';
import { PasswordContainsNumbers } from 'src/shared/decorators/validation/password/numbers.decorator';
import { PasswordContainsSpecialCharacter } from 'src/shared/decorators/validation/password/special-characters.decorator';
import { PasswordContainsUppercaseLetter } from 'src/shared/decorators/validation/password/uppercase-letters.decorator';
import { UniqueUserProperty } from 'src/shared/decorators/validation/unique-property.decorator';
import { Username } from 'src/shared/decorators/validation/username.decorator';
import { thirteenYearsAgo } from 'src/shared/util/date.util';

export class CreateUserDto {
  @ApiProperty({
    description: "User's Email when registering",
    example: 'mutlaqalsadeed@gmail.com',
    name: 'email',
    required: true,
    uniqueItems: true,
    minLength: 3,
    maxLength: 737106,
    isArray: false,
    type: String,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Email',
    }),
  })
  @Transform((param) => param?.value?.toLowerCase()?.trim())
  @IsEmail(undefined, {
    message: i18nValidationMessage('validation.email'),
  })
  @MinLength(3, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Email',
      characters: 3,
    }),
  })
  @MaxLength(737106, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Email',
      characters: 737106,
    }),
  })
  @UniqueUserProperty('email', {
    message: i18nValidationMessage('validation.uniqueEmail'),
  })
  readonly email!: string;

  //*******************************************/

  @ApiProperty({
    description: "User's password when registering",
    example: 'GreaTPassWord123',
    name: 'password',
    required: true,
    minLength: 8,
    maxLength: 20,
    pattern: `/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&?.-_-*/ "])[a-zA-Z0-9!#$@^%&?.-_-*/]{8,20}$/`,
    type: 'string',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Password',
    }),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Password',
    }),
  })
  @MinLength(8, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Password',
      characters: 8,
    }),
  })
  @MaxLength(20, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Password',
      characters: 20,
    }),
  })
  @PasswordContainsNumbers()
  @PasswordContainsSpecialCharacter()
  @PasswordContainsLowercaseLetter()
  @PasswordContainsUppercaseLetter()
  password!: string;

  //*******************************************/

  @ApiProperty({
    description:
      "Admin's confirm password when registering, must match password property",
    example: 'GreaTPassWord123',
    name: 'confirmPassword',
    required: true,
    minLength: 8,
    maxLength: 20,
    pattern: `/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&?.-_-*/ "])[a-zA-Z0-9!#$@^%&?.-_-*/]{8,20}$/`,
    type: 'string',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Confirm Password',
    }),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Confirm Password',
    }),
  })
  @MinLength(8, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Confirm Password',
      characters: 8,
    }),
  })
  @MaxLength(20, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Confirm Password',
      characters: 20,
    }),
  })
  @PasswordContainsNumbers()
  @PasswordContainsSpecialCharacter()
  @PasswordContainsLowercaseLetter()
  @PasswordContainsUppercaseLetter()
  @Match('password')
  readonly confirmPassword!: string;

  //*******************************************/

  @ApiProperty({
    description: `User's username, must not have trilling or leading dots '..'.
     must not contain consecutive dots, and can only contain alphabets, dot, or underscores`,
    type: 'string',
    required: false,
    example: 'mut1aq',
    name: 'username',
    minLength: 3,
    maxLength: 30,
    isArray: false,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Username',
    }),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Username',
    }),
  })
  @MinLength(3, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Username',
      characters: 3,
    }),
  })
  @MaxLength(30, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Username',
      characters: 30,
    }),
  })
  @Transform((param) => param.value.toLowerCase().trim())
  @Username()
  @UniqueUserProperty('username', {
    message: i18nValidationMessage('validation.uniqueUsername'),
  })
  username!: string;

  @ApiProperty({
    description: "User's birthday",
    type: 'date string',
    required: true,
    example: 'MM/DD/YYYY',
    name: 'birthday',
    minimum: 13,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Birth Day',
    }),
  })
  @Transform(({ value }) => new Date(value))
  @MaxDate(thirteenYearsAgo, {
    message: i18nValidationMessage('validation.maxDate'),
  })
  birthday!: string;
  //*******************************************/

  @ApiProperty({
    maxLength: 120,
    minLength: 2,
    required: true,
    type: 'string',
    description: "User's First Name",
    isArray: false,
    example: 'Mutlaq Alsadeed',
    name: 'firstName',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'First Name',
    }),
  })
  @MinLength(2, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'First Name',
      characters: 2,
    }),
  })
  @MaxLength(120, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'First Name',
      characters: 120,
    }),
  })
  readonly firstName!: string;

  //*******************************************/

  @ApiProperty({
    maxLength: 120,
    minLength: 2,
    required: true,
    type: 'string',
    description: "User's Last Name",
    isArray: false,
    example: 'Mutlaq Alsadeed',
    name: 'lastName',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Last Name',
    }),
  })
  @MinLength(2, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Last Name',
      characters: 2,
    }),
  })
  @MaxLength(120, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Last Name',
      characters: 120,
    }),
  })
  readonly lastName!: string;

  //*******************************************/

  @ApiProperty({
    maxLength: 15,
    minLength: 7,
    required: true,
    type: 'string',
    description: "User's Phone Number",
    example: '0795367929',
    isArray: false,
    name: 'phoneNumber',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Phone Number',
    }),
  })
  @MinLength(7, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Phone Number',
      characters: 7,
    }),
  })
  @MaxLength(15, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Phone Number',
      characters: 15,
    }),
  })
  @IsNumberString(undefined, {
    message: i18nValidationMessage('validation.phoneNumber'),
  })
  @UniqueUserProperty('phoneNumber', {
    message: i18nValidationMessage('validation.uniquePhoneNumber'),
  })
  readonly phoneNumber!: string;
}
