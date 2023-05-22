import { userMongooseFeature } from '@modules/system-users/users/entities/user.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordContainsLowercaseLetterConstraint } from './validation/password/lowercase-letters.decorator';
import { PasswordContainsNumbersConstraint } from './validation/password/numbers.decorator';
import { PasswordContainsSpecialCharacterConstraint } from './validation/password/special-characters.decorator';
import { PasswordContainsUppercaseLetterConstraint } from './validation/password/uppercase-letters.decorator';
import { UniqueUserPropertyConstraint } from './validation/general/unique-property.decorator';
import { UsernameConstraint } from './validation/general/username.decorator';

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
  imports: [MongooseModule.forFeature([userMongooseFeature])],
  exports: [],
})
export class DecoratorsModule {}
