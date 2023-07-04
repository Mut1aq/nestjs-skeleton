import {
  OnModuleInit,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';

/**
 * Still haven't decided what to do with this
 */
export class TaskSchedulingListener
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {}
  onApplicationBootstrap() {}
  onModuleDestroy() {}
  beforeApplicationShutdown(_signal?: string | undefined) {}
  onApplicationShutdown(_signal?: string | undefined) {}
}
