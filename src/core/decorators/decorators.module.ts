import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
} from '@modules/system-users/users/entities/user.entity';
import { UniqueUserPropertyConstraint } from './validation/unique-property.decorator';

@Module({
  controllers: [],
  providers: [UniqueUserPropertyConstraint],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [],
})
export class DecoratorsModule {}
