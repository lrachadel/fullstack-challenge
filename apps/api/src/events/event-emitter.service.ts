import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 as uuidv4 } from 'uuid';
import { EventType, EmployeeEvent, EmployeeEventPayload } from './event.types';

@Injectable()
export class EventEmitterService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emitEmployeeEvent(
    type: EventType,
    payload: EmployeeEventPayload,
  ): EmployeeEvent {
    const event: EmployeeEvent = {
      id: uuidv4(),
      type,
      timestamp: new Date(),
      version: '1.0',
      payload,
    };

    this.eventEmitter.emit(type, event);
    this.eventEmitter.emit('employee.*', event);

    return event;
  }

  onEmployeeCreated(callback: (event: EmployeeEvent) => void): void {
    this.eventEmitter.on(EventType.EMPLOYEE_CREATED, callback);
  }

  onEmployeeUpdated(callback: (event: EmployeeEvent) => void): void {
    this.eventEmitter.on(EventType.EMPLOYEE_UPDATED, callback);
  }

  onEmployeeDeleted(callback: (event: EmployeeEvent) => void): void {
    this.eventEmitter.on(EventType.EMPLOYEE_DELETED, callback);
  }

  onEmployeeDeactivated(callback: (event: EmployeeEvent) => void): void {
    this.eventEmitter.on(EventType.EMPLOYEE_DEACTIVATED, callback);
  }

  onAnyEmployeeEvent(callback: (event: EmployeeEvent) => void): void {
    this.eventEmitter.on('employee.*', callback);
  }
}
