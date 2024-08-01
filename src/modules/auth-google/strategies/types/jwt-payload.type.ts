import { type UserEntity } from '../../../user/entity/user.entity';
import { type TypeTokenEnum } from '../../auth.enum';

export type JwtPayloadType = Pick<UserEntity, 'id'> & {
  id: UserEntity['id'];
  typeToken: TypeTokenEnum;
  iat: number;
  exp: number;
};
