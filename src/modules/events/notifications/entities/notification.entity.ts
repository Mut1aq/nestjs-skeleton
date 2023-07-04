import { User } from '@modules/system-users/users/interfaces/user.interface';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class Notification {
  @Prop({
    type: String,
    minlength: 0,
    maxlength: 2200,
    required: true,
  })
  body!: string;

  @Prop({
    type: String,
    minlength: 0,
    maxlength: 2200,
    required: true,
  })
  title!: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'Notification recipient is required'],
  })
  recipient!: User;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

export const notificationMongooseFeature = {
  name: Notification.name,
  schema: NotificationSchema,
};
