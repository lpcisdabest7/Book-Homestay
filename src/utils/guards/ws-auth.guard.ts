import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsAuthGuard extends AuthGuard('websocket') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }

  handleRequest(
    err: any,
    user: any,
    // info: any,
    // context: ExecutionContext,
    // status?: any,
  ) {
    if (err || !user) {
      throw new WsException('Unauthorized');
    }
    return user;
  }
}
