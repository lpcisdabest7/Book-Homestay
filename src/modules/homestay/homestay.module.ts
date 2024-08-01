import { Module } from '@nestjs/common';

import { HomeStayController } from './homestay.controller';
import { HomeStayService } from './homestay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeStayEntity } from './entity/homestay.entity';
import { HomestayRepository } from './homestay.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HomeStayEntity])],
  providers: [HomeStayService, HomestayRepository],
  controllers: [HomeStayController],
})
export class HomeStayModule {}
