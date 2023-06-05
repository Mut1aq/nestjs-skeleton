import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Room } from '../../rooms/interfaces/room.interface';
import { Message } from '../interfaces/message.interface';

export type MessagesContainerDocument = HydratedDocument<MessagesContainer>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class MessagesContainer {
  @Prop({
    type: Boolean,
    default: false,
  })
  isDeleted!: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages!: Message[];

  @Prop({
    type: Types.ObjectId,
    ref: 'Post',
    required: [true, 'MessagesContainer Room is required'],
  })
  room!: Room;
}

export const MessagesContainerSchema =
  SchemaFactory.createForClass(MessagesContainer);

export const messagesContainerMongooseFeature = {
  name: MessagesContainer.name,
  schema: MessagesContainerSchema,
};
