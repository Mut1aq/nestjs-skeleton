import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@shared/enums/role.enum';
import { CloudinaryObject } from '@shared/interfaces/general/cloudinary-object.interface';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class User {
  //********************* Register Data **********************/

  @Prop({
    type: String,
    minlength: [5, 'Email must be more than 5 characters'],
    maxlength: [320, 'Email must be less than 320 characters'],
    lowercase: true,
    trim: true,
    unique: true,
  })
  readonly email!: string;

  @Prop({
    type: String,
    required: [true, 'Password must be provided'],
    trim: true,
  })
  password!: string;

  @Prop({
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be more than 3 characters'],
    maxlength: [30, 'Username must be less than 30 characters'],
    lowercase: true,
    trim: true,
    unique: true,
  })
  username!: string;

  @Prop({
    type: String,
    required: [true, 'Birthday must be provided'],
  })
  birthday!: string;

  @Prop({
    type: String,
    minlength: [2, 'First Name length must be more than 2 characters'],
    maxlength: [120, 'First Name length must be less than 120 characters'],
    required: false,
    default: undefined,
    trim: true,
  })
  firstName!: string;

  @Prop({
    type: String,
    minlength: [2, 'Last Name length must be more than 2 characters'],
    maxlength: [120, 'Last Name length must be less than 120 characters'],
    required: false,
    default: undefined,
    trim: true,
  })
  lastName!: string;

  @Prop({
    type: String,
    minlength: [7, 'Phone number length must be more than 7 numbers'],
    maxlength: [15, 'Phone number length must be less than 15 numbers'],
    required: false,
    trim: true,
    index: true,
    unique: true,
    sparse: true,
    default: undefined,
  })
  phoneNumber!: string;

  @Prop({
    type: Number,
    enum: Role,
    default: Role.DEFAULT_USER,
  })
  role!: Role;

  @Prop({
    type: {
      url: String,
      publicID: String,
      _id: false,
    },
    required: false,
    default: undefined,
  })
  profilePicture?: CloudinaryObject;
}
export const UserSchema = SchemaFactory.createForClass(User);

export const userMongooseFeature = {
  name: User.name,
  schema: UserSchema,
};
