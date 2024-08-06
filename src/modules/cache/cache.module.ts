import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ApiConfigService } from '../../../src/shared/services/api-config.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: (apiConfigService: ApiConfigService) => ({
        errorLog: true,
        config: {
          host: apiConfigService.redis.host,
          port: apiConfigService.redis.port,
          db: apiConfigService.redis.db,
          username: apiConfigService.redis.username,
          password: apiConfigService.redis.password,
        },
      }),
      inject: [ApiConfigService],
    }),
  ],
  providers: [ApiConfigService],
  exports: [RedisModule],
})
export class CacheModule {}
