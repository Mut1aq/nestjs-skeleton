import { Types } from 'mongoose';

export class CreateMessageDto {
  text!: string;

  messagesContainerID!: Types.ObjectId;
}
