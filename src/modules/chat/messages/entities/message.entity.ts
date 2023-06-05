import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '@modules/system-users/users/interfaces/user.interface';
import { Room } from '@modules/chat/rooms/interfaces/room.interface';
import { MessagesContainer } from '../interfaces/messages-container.interface';

export type MessageDocument = HydratedDocument<Message>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class Message {
  @Prop({
    type: String,
    required: [true, 'Text is required'],
    minlength: 1,
    maxlength: 1000,
    trim: true,
  })
  text!: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'Message Author is required'],
  })
  author!: User;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'Message receiver is required'],
  })
  receiver!: User;

  @Prop({
    type: Types.ObjectId,
    ref: 'Room',
    required: [true, 'Message Room is required'],
  })
  room!: Room;

  @Prop({
    type: Types.ObjectId,
    ref: 'MessagesContainer',
    required: [true, 'Message MessagesContainer is required'],
  })
  messagesContainer!: MessagesContainer;

  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted!: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

export const messageMongooseFeature = {
  name: Message.name,
  schema: MessageSchema,
};
