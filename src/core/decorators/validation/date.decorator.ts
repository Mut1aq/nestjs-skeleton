import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DateDataTypeValidation } from '@shared/interfaces/validation/date-data-type-validation.interface';
import { checkNullability } from '@shared/util/check-nullability.util';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ name: 'Interval' })
@Injectable()
export class IntervalConstraint implements ValidatorConstraintInterface {
  message!: string;

  validate(date: string, _validationArguments?: ValidationArguments): boolean {
    const options = _validationArguments
      ?.constraints[0] as DateDataTypeValidation;

    const { max, isNotEmpty, min } = options;

    if (isNotEmpty && !date)
      throw new HttpException('isNotEmpty', HttpStatus.BAD_REQUEST);

    if (checkNullability(max)) {
      if (new Date(date) > new Date(max || ''))
        throw new HttpException('max', HttpStatus.BAD_REQUEST);
    }

    if (checkNullability(min)) {
      if (new Date(date) < new Date(min || ''))
        throw new HttpException(
          'min date is ' + new Date(date),
          HttpStatus.BAD_REQUEST,
        );
    }

    return true;
  }
  defaultMessage(_?: ValidationArguments): string {
    return this.message;
  }
}

export function DateValidator(
  validationOptions?: ValidationOptions & DateDataTypeValidation,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IntervalConstraint,
      constraints: [validationOptions],
    });
  };
}
