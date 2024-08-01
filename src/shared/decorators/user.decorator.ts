import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    return request.headers['user-id'];
  },
);
