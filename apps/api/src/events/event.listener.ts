import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventType } from './event.types';
import type { EmployeeEvent } from './event.types';
import { EventLogService } from './event-log.service';

@Injectable()
export class EventListener {
  private readonly logger = new Logger(EventListener.name);

  constructor(private readonly eventLogService: EventLogService) {}

  @OnEvent(EventType.EMPLOYEE_CREATED)
  async handleEmployeeCreated(event: EmployeeEvent) {
    this.logger.log(`Employee created: ${event.payload.employeeName}`);
    await this.processEvent(event);
  }

  @OnEvent(EventType.EMPLOYEE_UPDATED)
  async handleEmployeeUpdated(event: EmployeeEvent) {
    this.logger.log(`Employee updated: ${event.payload.employeeName}`);
    await this.processEvent(event);
  }

  @OnEvent(EventType.EMPLOYEE_DELETED)
  async handleEmployeeDeleted(event: EmployeeEvent) {
    this.logger.log(`Employee deleted: ${event.payload.employeeName}`);
    await this.processEvent(event);
  }

  @OnEvent(EventType.EMPLOYEE_DEACTIVATED)
  async handleEmployeeDeactivated(event: EmployeeEvent) {
    this.logger.log(`Employee deactivated: ${event.payload.employeeName}`);
    await this.processEvent(event);
  }

  @OnEvent(EventType.EMPLOYEE_ACTIVATED)
  async handleEmployeeActivated(event: EmployeeEvent) {
    this.logger.log(`Employee activated: ${event.payload.employeeName}`);
    await this.processEvent(event);
  }

  private async processEvent(event: EmployeeEvent) {
    try {
      const eventLog = await this.eventLogService.logEvent(event);
      await this.eventLogService.markAsProcessed(eventLog.id);
    } catch (error) {
      this.logger.error(`Error processing event ${event.type}: ${error}`);
    }
  }
}
