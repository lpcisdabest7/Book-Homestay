/* eslint-disable @typescript-eslint/naming-convention */
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: number[]) => SetMetadata('roles', roles);
