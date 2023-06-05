import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from '@modules/system-users/users/entities/user.entity';
import { PasswordContainsLowercaseLetterConstraint } from './password/lowercase-letters.decorator';
import { PasswordContainsNumbersConstraint } from './password/numbers.decorator';
import { PasswordContainsSpecialCharacterConstraint } from './password/special-characters.decorator';
import { PasswordContainsUppercaseLetterConstraint } from './password/uppercase-letters.decorator';
import { UniqueUserPropertyConstraint } from './validation/unique-property.decorator';
import { UsernameConstraint } from './validation/username.decorator';

@Module({
  controllers: [],
  providers: [
    UniqueUserPropertyConstraint,
    PasswordContainsLowercaseLetterConstraint,
    PasswordContainsUppercaseLetterConstraint,
    PasswordContainsNumbersConstraint,
    PasswordContainsSpecialCharacterConstraint,
    UsernameConstraint,
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [],
})
export class DecoratorsModule {}
