import { Types } from 'mongoose';
import { Socket as ISocket } from 'socket.io';
import { SocketDataPayload } from './socket-data-payload.interface';

export interface Socket extends ISocket {
  data: {
    user?: SocketDataPayload;
    room?: Types.ObjectId;
  };
}
