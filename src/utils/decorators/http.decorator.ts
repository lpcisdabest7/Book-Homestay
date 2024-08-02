import {
  applyDecorators,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  type PipeTransform,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { type Type } from '@nestjs/common/interfaces';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '../guards/auth.guard';
import { Roles } from './role.decorator';
import { RolesGuard } from '../guards/role.guard';
import { WsAuthGuard } from '../guards/ws-auth.guard';
import { RoleType } from '../../../src/constants';
import { AuthUserInterceptor } from '../interceptors/auth-user.interceptor';

export function Auth(
  roles: RoleType[] = [],
  options?: Partial<{ public: boolean }>,
): MethodDecorator {
  return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard({ public: options?.public }), RolesGuard),
    ApiBearerAuth(),
    UseInterceptors(AuthUserInterceptor),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function AuthWS(roles: RoleType[] = []): MethodDecorator {
  return applyDecorators(
    Roles(roles),
    UseGuards(WsAuthGuard, RolesGuard),
    UseInterceptors(AuthUserInterceptor),
  );
}

export function AuthRefreshToken(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthGuard({ refreshToken: true })),
    ApiHeader({
      name: 'x-refresh-token',
      required: true,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function UUIDParam(
  property: string,
  ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator {
  return Param(property, new ParseUUIDPipe({ version: '4' }), ...pipes);
}

export function IntParam(
  property: string,
  ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator {
  return Param(property, new ParseIntPipe(), ...pipes);
}
