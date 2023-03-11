import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../users/interfaces/user.interface';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class Admin {
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
  })
  password!: string;

  //********************* Business logic **********************/

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
  })
  deletedUsers!: User[];
}
export const AdminSchema = SchemaFactory.createForClass(Admin);

export const adminMongooseFeature = {
  name: Admin.name,
  schema: AdminSchema,
};
