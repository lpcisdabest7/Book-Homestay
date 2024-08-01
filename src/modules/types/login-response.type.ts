import { type UserEntity } from '../../modules/user/entity/user.entity';

export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  user: Partial<UserEntity>;
}>;
