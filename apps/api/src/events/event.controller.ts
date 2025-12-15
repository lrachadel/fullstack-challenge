import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { EventLogService } from './event-log.service';
import { EventType } from './event.types';

@Controller('events')
export class EventController {
  constructor(private readonly eventLogService: EventLogService) {}

  @Get()
  async getEvents(
    @Query('eventType') eventType?: EventType,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.eventLogService.findAll({
      eventType,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
    });
  }

  @Get('stats')
  async getEventStats() {
    return this.eventLogService.getEventStats();
  }

  @Get('types')
  getEventTypes() {
    return Object.values(EventType);
  }

  @Get(':id')
  async getEvent(@Param('id', ParseIntPipe) id: number) {
    return this.eventLogService.findOne(id);
  }
}
