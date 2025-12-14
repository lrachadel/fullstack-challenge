import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { EventType } from '../event.types';

@Entity('event_log')
export class EventLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  eventType: EventType;

  @Column({
    type: 'json',
  })
  payload: Record<string, any>;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ default: false })
  processed: boolean;
}
