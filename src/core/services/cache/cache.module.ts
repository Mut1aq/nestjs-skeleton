import { Global, Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as NestJSCache } from '@nestjs/cache-manager';
import { RedisOptions } from '@shared/configs/app-options';
import { LoggerModule } from '@services/logger/logger.module';
import { CacheListener } from './cache.listener';

@Global()
@Module({
  providers: [CacheService],
  exports: [CacheService],
  imports: [NestJSCache.registerAsync(RedisOptions), LoggerModule],
})
export class CacheModule extends CacheListener {}
