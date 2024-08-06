import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { BookingEntity } from './entity/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from './dto/homestay.create.dto';
import { StatusBooking } from '../homestay/enum/homestay.enum';
import { UserEntity } from '../user/entity/user.entity';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { HomeStayEntity } from '../homestay/entity/homestay.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingModel: Repository<BookingEntity>,

    @InjectRepository(HomeStayEntity)
    private readonly homestayModel: Repository<HomeStayEntity>,

    @InjectRedis() private readonly clientRedis: Redis,
  ) {}

  async create(user: UserEntity, dto: CreateBookingDto) {
    try {
      const homestay = await this.homestayModel.findOneBy({
        id: dto.homestayId,
      });
      if (!homestay) {
        throw new NotFoundException('Homestay not found');
      }
      const entity = await this.bookingModel.create(dto);
      entity.status = StatusBooking.ORDERED;
      entity.userId = user.id;
      if (dto.guestCount > homestay.maxGuest) {
        throw new HttpException(
          'Guest count exceeds the maximum allowed',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.bookingModel.save(entity);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(bookingId: string) {
    let inforBooking = await this.getCachedBookings(`bookingId_${bookingId}`);
    if (!inforBooking) {
      inforBooking = await this.bookingModel.findOneBy({ id: bookingId });
      if (!inforBooking) {
        throw new NotFoundException(`Booking with id ${bookingId} not found`);
      }
      await this.cacheBookings(`bookingId_${bookingId}`, inforBooking);
    }
    return inforBooking;
  }

  async getAll() {
    let bookings = await this.getCachedBookings('bookings');
    if (!bookings) {
      bookings = await this.bookingModel.find();
      await this.cacheBookings('bookings', bookings);
    }
    return bookings;
  }

  async getCachedBookings(cacheKey: string) {
    const cachedBookings = await this.clientRedis.get(cacheKey);
    return cachedBookings ? JSON.parse(cachedBookings) : null;
  }

  async cacheBookings(cacheKey: string, bookings: BookingEntity) {
    await this.clientRedis.set(cacheKey, JSON.stringify(bookings), 'EX', 3600);
  }
}
