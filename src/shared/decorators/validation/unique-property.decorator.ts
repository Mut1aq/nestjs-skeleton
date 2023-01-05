import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { UserDocument } from 'src/modules/system-users/user/entities/user.entity';

/**
 * #### Custom Validator to check if the email exists or not
 */
@ValidatorConstraint({ name: 'Unique', async: true })
@Injectable()
export class UniquePropertyConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<any> {
    const [property] = validationArguments?.constraints as string[];

    const user = await this.userModel.findOne({
      [property]: value,
    });
    if (!user) {
      return true;
    }
    return false;
  }
}

export function Unique(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UniquePropertyConstraint,
      constraints: [property],
    });
  };
}
