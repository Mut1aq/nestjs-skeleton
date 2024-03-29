import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { checkNullability } from '@shared/util/check-nullability.util';
import { Key } from './interfaces/key.type';
import { RedisObject } from './interfaces/redis-object.interface';

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

  async hget(objectName: string): Promise<RedisObject | undefined> {
    const stringObject = await this.cache.get<string>(objectName);
    return JSON.parse(stringObject! ?? {});
  }

  async hgetByKey(objectName: string, key: Key): Promise<string | undefined> {
    const stringObject = await this.cache.get<string>(objectName);

    const object: RedisObject | undefined = checkNullability(stringObject)
      ? JSON.parse(stringObject!)
      : {};
    return object?.[key];
  }

  async delete(key: string) {
    await this.cache.del(key);
  }

  async deleteByKey(objectName: string, key: Key) {
    const stringObject = await this.cache.get<string>(objectName);

    const object = checkNullability(stringObject)
      ? JSON.parse(stringObject!)
      : {};

    delete object?.[key];
  }
}
