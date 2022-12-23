import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { DynamicTranslationService } from 'src/services/dynamic-translation.service';
import { specialCharacters } from 'src/shared/constants/constants';

@ValidatorConstraint({ name: 'PasswordContainsSpecialCharacterConstraint' })
@Injectable()
export class PasswordContainsSpecialCharacterConstraint
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
    for (const specialCharacter of specialCharacters) {
      if (value.includes(specialCharacter) && specialCharacter !== '')
        return true;
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
    return 'auth.validation.passwordContains.specialCharacter';
  }
}
/**
 * #### Custom Validator to check if a Password contains a lowercase letter
 */
export function PasswordContainsSpecialCharacter(
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PasswordContainsSpecialCharacterConstraint,
    });
  };
}
