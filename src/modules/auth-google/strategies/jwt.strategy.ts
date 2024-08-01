import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { UserEntity } from '../../../modules/user/entity/user.entity';
import { ApiConfigService } from '../../../shared/services/api-config.service';
import { TypeTokenEnum } from '../auth.enum';
import { type JwtPayloadType } from './types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ApiConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.secret,
    });
  }

  public validate(payload: JwtPayloadType) {
    if (!payload.id) {
      throw new UnauthorizedException();
    }

    if (payload.typeToken !== TypeTokenEnum.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    return this.userRepository.find({ where: { id: payload.id } });
  }
}
