import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookingEntity } from './entity/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from './dto/homestay.create.dto';
import { StatusBooking } from '../homestay/enum/homestay.enum';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingModel: Repository<BookingEntity>,
  ) {}

  async create(user: UserEntity, dto: CreateBookingDto) {
    const entity = this.bookingModel.create(dto);
    entity.isBooking = true;
    entity.status = StatusBooking.ORDERED;
    entity.userId = user.id;
    return await this.bookingModel.save(entity);
  }

  async getAll() {
    return await this.bookingModel.find();
  }
}
