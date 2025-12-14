import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventLog } from './entities/event-log.entity';
import { EventType } from './event.types';
import type { EmployeeEvent } from './event.types';

@Injectable()
export class EventLogService {
  constructor(
    @InjectRepository(EventLog)
    private readonly eventLogRepository: Repository<EventLog>,
  ) {}

  async logEvent(event: EmployeeEvent): Promise<EventLog> {
    const eventLog = this.eventLogRepository.create({
      eventType: event.type,
      payload: {
        eventId: event.id,
        version: event.version,
        ...event.payload,
      },
      processed: false,
    });

    return this.eventLogRepository.save(eventLog);
  }

  async markAsProcessed(id: number): Promise<void> {
    await this.eventLogRepository.update(id, { processed: true });
  }

  async findAll(options?: {
    eventType?: EventType;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  }): Promise<{ events: EventLog[]; total: number }> {
    const query = this.eventLogRepository.createQueryBuilder('event');

    if (options?.eventType) {
      query.andWhere('event.eventType = :eventType', {
        eventType: options.eventType,
      });
    }

    if (options?.startDate) {
      query.andWhere('event.timestamp >= :startDate', {
        startDate: options.startDate,
      });
    }

    if (options?.endDate) {
      query.andWhere('event.timestamp <= :endDate', {
        endDate: options.endDate,
      });
    }

    query.orderBy('event.timestamp', 'DESC');

    if (options?.limit) {
      query.take(options.limit);
    }

    if (options?.offset) {
      query.skip(options.offset);
    }

    const [events, total] = await query.getManyAndCount();

    return { events, total };
  }

  async findOne(id: number): Promise<EventLog | null> {
    return this.eventLogRepository.findOne({
      where: { id },
    });
  }

  async getEventStats(): Promise<{
    total: number;
    byType: Record<string, number>;
    last24Hours: number;
  }> {
    const total = await this.eventLogRepository.count();

    const byTypeResult = await this.eventLogRepository
      .createQueryBuilder('event')
      .select('event.eventType', 'eventType')
      .addSelect('COUNT(*)', 'count')
      .groupBy('event.eventType')
      .getRawMany();

    const byType: Record<string, number> = {};
    byTypeResult.forEach((row) => {
      byType[row.eventType] = parseInt(row.count, 10);
    });

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const last24Hours = await this.eventLogRepository
      .createQueryBuilder('event')
      .where('event.timestamp >= :yesterday', { yesterday })
      .getCount();

    return { total, byType, last24Hours };
  }
}
