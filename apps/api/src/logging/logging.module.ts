import { Module, Global } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { CustomLoggerService } from './logger.service';
import { HttpLoggingInterceptor } from './http-logging.interceptor';
import { ErrorTrackingFilter } from './error-tracking.filter';

@Global()
@Module({
  providers: [
    CustomLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorTrackingFilter,
    },
  ],
  exports: [CustomLoggerService],
})
export class LoggingModule {}
