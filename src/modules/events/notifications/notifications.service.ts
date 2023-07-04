import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import * as firebase from 'firebase-admin';
import { join } from 'path';
import {
  TokenMessage,
  TopicMessage,
  ConditionMessage,
} from 'firebase-admin/lib/messaging/messaging-api';

export declare type Message = TokenMessage | TopicMessage | ConditionMessage;

firebase.initializeApp({
  credential: firebase.credential.cert(
    join(process.cwd() + '/skeleton-sdk.json'),
  ),
});
@Injectable()
export class NotificationsService {
  create(_createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  async findAll() {}

  remove(id: string) {
    return `This action removes a #${id} notification`;
  }
}
