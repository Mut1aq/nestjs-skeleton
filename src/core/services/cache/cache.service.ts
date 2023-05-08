import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { checkNullability } from '@shared/util/check-nullability.util';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async set(key: string, value: string, ttl?: number) {
    await this.cache.set(key, value, ttl);
  }

  async hset(objectName: string, key: string, value: string, ttl?: number) {
    const stringObject = await this.cache.get<string>(objectName);
    const object = checkNullability(stringObject)
      ? JSON.parse(stringObject!)
      : {};
    object[key] = value;
    await this.cache.set(objectName, JSON.stringify(object), ttl);
  }

  async get(key: string) {
    return this.cache.get<string>(key);
  }

  async hget(objectName: string) {
    const stringObject = await this.cache.get<string>(objectName);
    return JSON.parse(stringObject! ?? {});
  }

  async hgetByKey(objectName: string, key: 'accessToken' | 'socketID') {
    const stringObject = await this.cache.get<string>(objectName);
    const object = JSON.parse(stringObject! ?? {});
    return object[key];
  }

  async del(key: string) {
    await this.cache.del(key);
  }
}
