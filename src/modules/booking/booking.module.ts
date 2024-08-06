import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entity/booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { HomeStayEntity } from '../homestay/entity/homestay.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, HomeStayEntity])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
