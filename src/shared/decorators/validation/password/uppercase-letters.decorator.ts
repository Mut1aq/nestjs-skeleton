import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { DynamicTranslationService } from 'src/services/dynamic-translation.service';
import { uppercaseLetters } from 'src/shared/constants/constants';

@ValidatorConstraint({ name: 'PasswordContainsUppercaseLetter' })
@Injectable()
export class PasswordContainsUppercaseLetterConstraint
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
    for (const uppercaseLetter of uppercaseLetters) {
      if (value.includes(uppercaseLetter)) return true;
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
    return 'auth.validation.passwordContains.uppercase';
  }
}
/**
 * #### Custom Validator to check if a Password contains an uppercase letter
 */
export function PasswordContainsUppercaseLetter(
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PasswordContainsUppercaseLetterConstraint,
    });
  };
}
