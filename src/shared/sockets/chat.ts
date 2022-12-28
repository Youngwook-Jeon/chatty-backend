import { ISenderReceiver } from '@chat/interfaces/chat.interface';
import { Server, Socket } from 'socket.io';
import { connectedUsersMap } from './user';

export let socketIOChatObject: Server;

export class SocketIOChatHandler {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    socketIOChatObject = io;
  }

  public listen(): void {
    this.io.on('connection', (socket: Socket) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      socket.on('join room', (users: ISenderReceiver) => {
        const { senderName, receiverName } = users;
        const senderSocketId: string = connectedUsersMap.get(senderName) as string;
        const receiverSocketId: string = connectedUsersMap.get(receiverName) as string;
        socket.join(senderSocketId);
        socket.join(receiverSocketId);
      });
    });
  }
}
