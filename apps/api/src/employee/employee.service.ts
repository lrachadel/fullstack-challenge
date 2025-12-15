import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { EventEmitterService } from '../events/event-emitter.service';
import { EventType } from '../events/event.types';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private readonly repo: Repository<Employee>,
    private readonly eventEmitter: EventEmitterService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    if (!createEmployeeDto.name || createEmployeeDto.name.trim() === '') {
      throw new BadRequestException('O nome é obrigatório');
    }

    if (
      !createEmployeeDto.hireDate ||
      createEmployeeDto.hireDate.trim() === ''
    ) {
      throw new BadRequestException('A data de contratação é obrigatória');
    }

    const employee = this.repo.create({
      ...createEmployeeDto,
      status: 'Active',
    });

    const savedEmployee = await this.repo.save(employee);

    this.eventEmitter.emitEmployeeEvent(EventType.EMPLOYEE_CREATED, {
      employeeId: savedEmployee.id,
      employeeName: savedEmployee.name,
      department: savedEmployee.department,
    });

    return savedEmployee;
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const existingEmployee = await this.repo.findOneBy({ id });

    if (!existingEmployee) {
      throw new BadRequestException('Funcionário não encontrado');
    }

    const changes: Record<string, { old: unknown; new: unknown }> = {};
    for (const [key, value] of Object.entries(updateEmployeeDto)) {
      const existingValue = existingEmployee[key as keyof Employee];
      if (existingValue !== value) {
        changes[key] = { old: existingValue, new: value };
      }
    }

    await this.repo.update({ id }, updateEmployeeDto);

    const updatedEmployee = await this.repo.findOneBy({ id });

    this.eventEmitter.emitEmployeeEvent(EventType.EMPLOYEE_UPDATED, {
      employeeId: id,
      employeeName: updatedEmployee?.name || existingEmployee.name,
      department: updatedEmployee?.department || existingEmployee.department,
      changes,
    });

    return { affected: 1 };
  }

  async remove(id: number) {
    const employee = await this.repo.findOneBy({ id });

    if (!employee) {
      throw new BadRequestException('Funcionário não encontrado');
    }

    await this.repo.update({ id }, { status: 'Inactive' });

    this.eventEmitter.emitEmployeeEvent(EventType.EMPLOYEE_DEACTIVATED, {
      employeeId: id,
      employeeName: employee.name,
      department: employee.department,
    });

    return { affected: 1 };
  }

  async seed() {
    const initialCount = await this.repo.count();

    if (initialCount == 0) {
      console.log(
        `Database already has ${initialCount} employees, skipping seed`,
      );

      const jsonPath = path.join(
        __dirname,
        '../../assets/org-chart-people-100.json',
      );
      const jsonData = fs.readFileSync(jsonPath, 'utf-8');

      interface SeedEmployee {
        id: number;
        name: string;
        jobTitle: string;
        department: string;
        managerId: number | null;
        photoPath: string;
        type: string;
        status: string;
        workEmail: string;
        hireDate: string;
        location: string;
      }

      const employees = JSON.parse(jsonData) as SeedEmployee[];

      for (const emp of employees) {
        const employee = this.repo.create({
          id: emp.id,
          name: emp.name,
          jobTitle: emp.jobTitle,
          department: emp.department,
          managerId: emp.managerId,
          photoPath: emp.photoPath,
          type: emp.type,
          status: emp.status,
          workEmail: emp.workEmail,
          hireDate: emp.hireDate,
          location: emp.location,
        });
        await this.repo.save(employee);
      }
      return { message: `Seeded ${employees.length} employees` };
    }

    return {
      message:
        'Seeding completed - no employees were seeded (database already populated)',
    };
  }

  count() {
    return this.repo.count();
  }
}
