import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/user.update.dto';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { assignIn } from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const userExist = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    assignIn(userExist, updateUserDto);

    await this.userRepository.save(userExist);

    return userExist;
  }
}
