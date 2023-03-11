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
import {
  Admin,
  AdminDocument,
} from 'src/modules/system-users/admins/entities/admin.entity';
import {
  User,
  UserDocument,
} from 'src/modules/system-users/users/entities/user.entity';

@ValidatorConstraint({ name: 'UniqueUserProperty', async: true })
@Injectable()
export class UniqueUserPropertyConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectModel(User.name)
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

export function UniqueUserProperty(
  property: string,
  validationOptions: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UniqueUserPropertyConstraint,
      constraints: [property],
    });
  };
}
@ValidatorConstraint({ name: 'UniqueAdminProperty', async: true })
@Injectable()
export class UniqueAdminPropertyConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
  ) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<any> {
    const [property] = validationArguments?.constraints as string[];

    const Admin = await this.adminModel.findOne({
      [property]: value,
    });
    if (!Admin) {
      return true;
    }
    return false;
  }
}

export function UniqueAdminProperty(
  property: string,
  validationOptions: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UniqueAdminPropertyConstraint,
      constraints: [property],
    });
  };
}
