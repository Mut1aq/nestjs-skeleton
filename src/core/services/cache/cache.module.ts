import { Global, Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as NestJSCache } from '@nestjs/cache-manager';
import { RedisConfig } from '@shared/configs/app-options';

@Global()
@Module({
  providers: [CacheService],
  exports: [CacheService],
  imports: [NestJSCache.registerAsync(RedisConfig)],
})
export class CacheModule {}
