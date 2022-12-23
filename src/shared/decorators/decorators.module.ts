import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from 'src/modules/system-users/user/entities/user.entity';
import { ServicesModule } from 'src/services/services.module';
import { PasswordContainsLowercaseLetterConstraint } from './validation/password/lowercase-letters.decorator';
import { PasswordContainsNumbersConstraint } from './validation/password/numbers.decorator';
import { PasswordContainsSpecialCharacterConstraint } from './validation/password/special-characters.decorator';
import { PasswordContainsUppercaseLetterConstraint } from './validation/password/uppercase-letters.decorator';
import { UniquePropertyConstraint } from './validation/unique-property.decorator';

@Module({
  controllers: [],
  providers: [
    UniquePropertyConstraint,
    PasswordContainsLowercaseLetterConstraint,
    PasswordContainsUppercaseLetterConstraint,
    PasswordContainsNumbersConstraint,
    PasswordContainsSpecialCharacterConstraint,
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ServicesModule,
  ],
  exports: [],
})
export class DecoratorsModule {}
