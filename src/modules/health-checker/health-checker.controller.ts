import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthCheckerController {
  constructor() {}

  @Get()
  check() {
    return 'ok';
  }
}
