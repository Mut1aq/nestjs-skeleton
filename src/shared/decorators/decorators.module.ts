import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Admin,
  AdminSchema,
} from 'src/modules/system-users/admins/entities/admin.entity';
import {
  User,
  UserSchema,
} from 'src/modules/system-users/users/entities/user.entity';
import { PasswordContainsLowercaseLetterConstraint } from './validation/password/lowercase-letters.decorator';
import { PasswordContainsNumbersConstraint } from './validation/password/numbers.decorator';
import { PasswordContainsSpecialCharacterConstraint } from './validation/password/special-characters.decorator';
import { PasswordContainsUppercaseLetterConstraint } from './validation/password/uppercase-letters.decorator';
import { UniqueUserPropertyConstraint } from './validation/unique-property.decorator';
import { UniqueAdminPropertyConstraint } from './validation/unique-property.decorator';
import { UsernameConstraint } from './validation/username.decorator';

@Module({
  controllers: [],
  providers: [
    UniqueAdminPropertyConstraint,
    UniqueUserPropertyConstraint,
    PasswordContainsLowercaseLetterConstraint,
    PasswordContainsUppercaseLetterConstraint,
    PasswordContainsNumbersConstraint,
    PasswordContainsSpecialCharacterConstraint,
    UsernameConstraint,
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  exports: [],
})
export class DecoratorsModule {}
