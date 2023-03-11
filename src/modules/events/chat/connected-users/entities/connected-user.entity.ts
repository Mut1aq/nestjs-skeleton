import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserDocument } from 'src/modules/system-users/users/entities/user.entity';

export type ConnectedUserDocument = HydratedDocument<ConnectedUser>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class ConnectedUser {
  @Prop({
    type: [{ type: Types.ObjectId }],
    ref: 'User',
  })
  users!: UserDocument;

  @Prop({
    type: String,
    unique: true,
    trim: true,
  })
  socketID!: string;
}

export const ConnectedUserSchema = SchemaFactory.createForClass(ConnectedUser);
