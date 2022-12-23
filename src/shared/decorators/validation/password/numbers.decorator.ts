import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { DynamicTranslationService } from 'src/services/dynamic-translation.service';
import { numbers } from 'src/shared/constants/constants';

@ValidatorConstraint({ name: 'PasswordContainsNumbers' })
@Injectable()
export class PasswordContainsNumbersConstraint
  implements ValidatorConstraintInterface
{
  message: string;
  constructor(
    private readonly dynamicTranslationService: DynamicTranslationService,
  ) {}
  async validate(
    value: string = '',
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    for (const number of numbers) {
      if (value.includes(`${number}`)) return true;
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
    return 'auth.validation.passwordContains.number';
  }
}
/**
 * #### Custom Validator to check if a Password contains a number
 */
export function PasswordContainsNumbers(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PasswordContainsNumbersConstraint,
    });
  };
}
