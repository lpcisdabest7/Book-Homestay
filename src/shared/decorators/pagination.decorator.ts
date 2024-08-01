import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const query = request.query;
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const orderBy = query.orderBy;
    const orderType = query.orderType;
    const skip = (page - 1) * limit;

    return { page, limit, skip, orderBy, orderType };
  },
);
