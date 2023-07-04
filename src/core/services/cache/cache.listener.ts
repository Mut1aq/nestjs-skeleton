import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { ServerAPILogger } from '@services/logger/server-api.logger';
import { Cache } from 'cache-manager';
import { RedisStore } from 'cache-manager-redis-store';
import { CacheService } from './cache.service';

export class CacheListener implements OnModuleInit, OnModuleDestroy {
  private readonly redisStore!: RedisStore;
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,

    private readonly serverAPILogger: ServerAPILogger,

    private readonly cacheService: CacheService,
  ) {
    this.redisStore = cache.store as unknown as RedisStore;
  }

  onModuleInit() {
    const client = this.redisStore.getClient();

    if (!client) {
      this.serverAPILogger.error('no redis client initialized', 'REDIS');
    }

    client.on('connect', () => {
      this.serverAPILogger.log(
        'redis client is connecting to server...',
        'REDIS',
      );
    });

    client.on('ready', () => {
      this.serverAPILogger.log('redis client is ready', 'REDIS');
    });

    if (client.isReady) {
      this.serverAPILogger.log('redis client is connected and ready', 'REDIS');
    }

    client.on('end', () => {
      this.serverAPILogger.log('redis client connection closed', 'REDIS');
    });

    client.on('error', (error: Error) => {
      this.serverAPILogger.error(error, 'REDIS');
    });
  }
  async onModuleDestroy() {
    await this.clearAllSocketData();
    await this.redisStore.getClient().quit();
  }

  async clearAllSocketData() {
    const keys = await this.cache.store.keys();

    for (const key of keys) {
      this.cacheService.deleteByKey(key, 'socketID');
    }
  }
}
