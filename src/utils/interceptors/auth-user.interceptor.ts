import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import { ContextProvider } from '../providers/context.provider';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    if (context.getType() === 'ws') {
      // const client = context.switchToWs().getClient();
      // const user = client.handshake.user;
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    ContextProvider.setAuthUser(user);
    return next.handle();
  }
}
