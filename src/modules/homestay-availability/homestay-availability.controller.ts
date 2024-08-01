import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HomeStays-Availability')
@Controller({
  path: 'homestay-availability',
  version: '1',
})
export class HomeStayAvailabilityController {
  constructor() {}
}
