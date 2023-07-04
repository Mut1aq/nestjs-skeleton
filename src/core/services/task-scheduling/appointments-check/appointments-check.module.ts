import { Module } from '@nestjs/common';
import { LoggerModule } from '@services/logger/logger.module';
import { AppointmentsCheckService } from './appointments-check.service';

@Module({
  providers: [AppointmentsCheckService],
  imports: [LoggerModule],
})
export class AppointmentsCheckModule {}
