export enum EventType {
  EMPLOYEE_CREATED = 'employee.created',
  EMPLOYEE_UPDATED = 'employee.updated',
  EMPLOYEE_DELETED = 'employee.deleted',
  EMPLOYEE_DEACTIVATED = 'employee.deactivated',
  EMPLOYEE_ACTIVATED = 'employee.activated',
}

export interface BaseEvent {
  id: string;
  type: EventType;
  timestamp: Date;
  version: string;
}

export interface EmployeeEventPayload {
  employeeId: number;
  employeeName: string;
  department: string;
  changes?: Record<string, { old: any; new: any }>;
}

export interface EmployeeEvent extends BaseEvent {
  payload: EmployeeEventPayload;
}
