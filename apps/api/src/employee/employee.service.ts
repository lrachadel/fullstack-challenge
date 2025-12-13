import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmployeeService {

  constructor(@InjectRepository(Employee) private readonly repo: Repository<Employee>) { }

  create(createEmployeeDto: CreateEmployeeDto) {
    return this.repo.create(createEmployeeDto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.repo.update({ id }, updateEmployeeDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async seed() {
    const initialCount = await this.repo.count();

    if (initialCount == 0) {
      console.log(`Database already has ${initialCount} employees, skipping seed`);    

      const jsonPath = path.join(__dirname, '../../assets/org-chart-people-100.json');
      const jsonData = fs.readFileSync(jsonPath, 'utf-8');
      const employees = JSON.parse(jsonData);

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

   return { message: "Seeding completed - no employees were seeded (database already populated)" };
  }

  count() {
    return this.repo.count();
  }
}
