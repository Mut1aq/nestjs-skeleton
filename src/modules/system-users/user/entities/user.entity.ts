import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    minlength: [2, 'Full name must be more than 2 characters'],
    trim: true,
  })
  fullName!: string;

  @Prop({
    type: String,
    minlength: [5, 'Email must be more than 5 characters'],
    lowercase: true,
    trim: true,
    unique: true,
  })
  email!: string;

  @Prop({
    type: String,
    required: [true, 'Password must be provided'],
  })
  password!: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
