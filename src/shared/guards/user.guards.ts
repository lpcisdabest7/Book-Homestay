import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { type Request } from 'express';
import { type Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  validateRequest(request: Request) {
    return !(
      !request.headers['user-id'] || !isUUID(request.headers['user-id'])
    );
  }
}
