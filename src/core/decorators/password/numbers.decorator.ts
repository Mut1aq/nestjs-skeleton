import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { numbers } from '@shared/constants/validation/validation-constants';

@ValidatorConstraint({ name: 'PasswordContainsNumbers' })
@Injectable()
export class PasswordContainsNumbersConstraint
  implements ValidatorConstraintInterface
{
  async validate(
    value: string = '',
    _?: ValidationArguments,
  ): Promise<boolean> {
    for (const number of numbers) {
      if (value.includes(`${number}`)) return true;
    }

    return false;
  }

  defaultMessage(validationArguments?: ValidationArguments): any {
    if (validationArguments?.property === 'confirmPassword') {
      return 'validation.confirmPasswordContains.number';
    }
    return 'validation.passwordContains.number';
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
