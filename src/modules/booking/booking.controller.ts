import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/homestay.create.dto';
import { UserEntity } from '../user/entity/user.entity';
import { Auth } from '../../../src/utils/decorators/http.decorator';
import { AuthUser } from '../../../src/utils/decorators/auth-user.decorator';

@ApiTags('Booking')
@Controller({
  path: 'booking',
  version: '1',
})
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  async create(@AuthUser() user: UserEntity, @Body() dto: CreateBookingDto) {
    return await this.bookingService.create(user, dto);
  }

  @Get('getAll')
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.bookingService.getAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.bookingService.getById(id);
  }
}
