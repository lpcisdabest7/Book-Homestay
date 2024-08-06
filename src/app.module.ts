import './boilerplate.polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClsModule } from 'nestjs-cls';

import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { AuthGoogleModule } from './modules/auth-google/auth-google.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/common.error-filter';
import { HomeStayModule } from './modules/homestay/homestay.module';
// import { HomeStayAvailabilityModule } from './modules/homestay-availability/homestay-availability.module';
import { BookingModule } from './modules/booking/booking.module';
import { CacheModule } from './modules/cache/cache.module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.databaseConfig,
      inject: [ApiConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HealthCheckerModule,
    UserModule,
    AuthGoogleModule,
    HomeStayModule,
    // HomeStayAvailabilityModule,
    BookingModule,
    CacheModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
