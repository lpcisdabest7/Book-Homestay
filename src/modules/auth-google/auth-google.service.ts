import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { Repository } from 'typeorm';

import { UserEntity } from '../../modules/user/entity/user.entity';
import { RoleEnum } from '../../roles/roles.enum';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { LoginResponseType } from '../types/login-response.type';
import { TypeTokenEnum } from './auth.enum';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';

@Injectable()
export class AuthGoogleService {
  private google: OAuth2Client;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.google = new OAuth2Client(
      configService.authGoogle.clientId,
      configService.authGoogle.clientSecret,
    );
  }

  async getProfileByToken(loginDto: AuthGoogleLoginDto) {
    const ticket = await this.google.verifyIdToken({
      idToken: loginDto.idToken,
      audience: this.configService.authGoogle.clientId,
    });

    const data = ticket.getPayload();

    if (!data) {
      throw new HttpException('Error', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async validateSocialLogin(payload: TokenPayload): Promise<LoginResponseType> {
    console.log(payload);
    try {
      let user = await this.userRepository.findOne({
        where: { email: payload.email },
      });

      if (!user) {
        user = this.userRepository.create({
          role: RoleEnum[RoleEnum.user],
          email: payload.email,
          username: payload.name,
          image: payload.picture,
        });
        user = await this.userRepository.save(user);
      }

      const tokenData = await this.getTokensData({
        id: user.id,
        role: user.role,
      });

      return { ...tokenData, user };
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
      });
    }
  }

  private async getTokensData(data: {
    id: UserEntity['id'];
    role: UserEntity['role'];
  }) {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: data.id,
          role: data.role,
          typeToken: TypeTokenEnum.ACCESS_TOKEN,
        },
        {
          secret: this.configService.authConfig.secret,
          expiresIn: this.configService.authConfig.expires,
        },
      ),
      this.jwtService.signAsync(
        {
          id: data.id,
          typeToken: TypeTokenEnum.REFRESH_TOKEN,
        },
        {
          secret: this.configService.authConfig.refreshSecret,
          expiresIn: this.configService.authConfig.refreshExpires,
        },
      ),
    ]);

    return {
      token,
      refreshToken,
    };
  }
}
