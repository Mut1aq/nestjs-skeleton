import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '@modules/system-users/users/interfaces/user.interface';
import { MessagesContainer } from '../../messages/interfaces/messages-container.interface';

export type RoomDocument = HydratedDocument<Room>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class Room {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users!: User[];

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'Room Author is required'],
  })
  author!: User;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'Room Second Party is required'],
  })
  secondParty!: User;

  @Prop({
    type: Types.ObjectId,
    ref: 'MessagesContainer',
    required: [true, 'Message Container is required'],
  })
  messagesContainer!: MessagesContainer;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted!: boolean;
}

export const RoomSchema = SchemaFactory.createForClass(Room);

export const roomMongooseFeature = {
  name: Room.name,
  schema: RoomSchema,
};
