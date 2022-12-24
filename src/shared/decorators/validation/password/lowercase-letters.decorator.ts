import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { lowercaseLetters } from 'src/shared/constants/constants';
import { DynamicTranslationService } from 'src/services/dynamic-translation.service';

@ValidatorConstraint({ name: 'PasswordContainsLowercaseLetter' })
@Injectable()
export class PasswordContainsLowercaseLetterConstraint
  implements ValidatorConstraintInterface
{
  message: string = '';
  constructor(
    private readonly dynamicTranslationService: DynamicTranslationService,
  ) {}

  async validate(
    value: string = '',
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    for (const lowercaseLetter of lowercaseLetters) {
      if (value?.includes(lowercaseLetter)) return true;
    }

    return false;
  }
  defaultMessage(validationArguments?: ValidationArguments): any {
    // const message = this.dynamicTranslationService.passwordTranslation(
    //   'number',
    //   'password',
    // );

    // message.then((value) => {
    //   this.message = value;
    // });

    // return this.message;
    return 'auth.validation.passwordContains.lowercase';
  }
}
/**
 * #### Custom Validator to check if a Password contains a lowercase letter
 */
export function PasswordContainsLowercaseLetter(
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PasswordContainsLowercaseLetterConstraint,
    });
  };
}
