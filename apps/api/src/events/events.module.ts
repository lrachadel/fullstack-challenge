import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventLog } from './entities/event-log.entity';
import { EventEmitterService } from './event-emitter.service';
import { EventLogService } from './event-log.service';
import { EventListener } from './event.listener';
import { EventController } from './event.controller';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    TypeOrmModule.forFeature([EventLog]),
  ],
  controllers: [EventController],
  providers: [EventEmitterService, EventLogService, EventListener],
  exports: [EventEmitterService, EventLogService],
})
export class EventsModule {}
