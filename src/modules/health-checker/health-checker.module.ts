import { Module } from '@nestjs/common';

import { HealthCheckerController } from './health-checker.controller';

@Module({
  imports: [],
  controllers: [HealthCheckerController],
  providers: [],
})
export class HealthCheckerModule {}
