import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Basic } from 'src/shared/entities/basic.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({
  validateBeforeSave: true,
})
export class User extends Basic {
  @Prop({
    type: String,
    minlength: [2, 'Full name must be more than 2 characters'],
    trim: true,
  })
  fullName: string;

  @Prop({
    type: String,
    minlength: [5, 'Email must be more than 5 characters'],
    lowercase: true,
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Password must be provided'],
  })
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
