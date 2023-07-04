import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AdsDeletionModule } from './ads-deletion/ads-deletion.module';
import { AppointmentsCheckModule } from './appointments-check/appointments-check.module';
import { TaskSchedulingListener } from './task-scheduling-listener';
import { PromotedUsersCheckModule } from './promoted-users-check/promoted-users-check.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AppointmentsCheckModule,
    AdsDeletionModule,
    PromotedUsersCheckModule,
  ],
})
export class TaskSchedulingModule extends TaskSchedulingListener {}
