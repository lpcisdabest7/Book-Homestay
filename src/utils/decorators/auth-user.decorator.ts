import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export function AuthUser() {
  return createParamDecorator((_data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (user?.[Symbol.for('isPublic')]) {
        return;
      }

      return user;
    }

    if (context.getType() === 'ws') {
      const client = context.switchToWs().getClient();
      const user = client.handshake.user;

      if (user?.[Symbol.for('isPublic')]) {
        return;
      }

      return user;
    }
  })();
}
