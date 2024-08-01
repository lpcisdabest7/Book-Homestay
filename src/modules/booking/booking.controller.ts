import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller({
  path: 'booking',
  version: '1',
})
export class BookingController {
  constructor() {}
}
